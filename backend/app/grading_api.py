from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import re
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from typing import Optional
from sklearn.metrics.pairwise import cosine_similarity  # Add this line

nltk.download('stopwords')

# Create FastAPI app instance
app = FastAPI(title="Answer Grading API")

# Add CORS middleware to allow cross-origin requests (including OPTIONS method)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (you can specify a list of allowed origins if needed)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Load model and scaler
model = joblib.load('app/models/random_forest_model.pkl')
scaler = joblib.load('app/models/scaler.pkl')

# Define request and response models
class GradingRequest(BaseModel):
    real_answer: str
    student_answer: str
    similarity_threshold: Optional[float] = 0.2

class GradingResponse(BaseModel):
    predicted_grade: float
    similarity_score: float
    is_below_threshold: bool
    features: dict

# Function to calculate text features
def calculate_text_features(real_answer: str, student_answer: str) -> np.ndarray:
    """Calculate numerical text features"""
    combined = real_answer + " " + student_answer
    
    def count_words(text):
        return len(text.split())

    def count_unique_words(text):
        return len(set(text.split()))

    def count_sentences(text):
        return len(re.findall(r'[.!?]', text))

    def count_long_words(text, length_threshold=7):
        return len([word for word in text.split() if len(word) >= length_threshold])

    return np.array([  
        count_words(combined),
        count_unique_words(combined),
        count_sentences(combined),
        count_long_words(combined)
    ])

# Function to calculate cosine similarity
def calculate_cosine_similarity(real_answer: str, student_answer: str) -> float:
    """Calculate TF-IDF cosine similarity"""
    vectorizer = TfidfVectorizer(stop_words='english')
    try:
        tfidf_matrix = vectorizer.fit_transform([real_answer, student_answer])
        return cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    except ValueError:
        return 0.0  # Handle empty strings or other vectorization errors

# Function to count stop words
def count_stop_words(text: str) -> tuple:
    """Count stop words and non-stop words"""
    stop_words = set(stopwords.words('english'))
    words = text.split()
    stop_count = sum(1 for word in words if word.lower() in stop_words)
    return stop_count, len(words) - stop_count

# Define the endpoint for grading prediction
@app.post("/predict-grade", response_model=GradingResponse)
async def predict_grade(request: GradingRequest):
    # Calculate features
    text_features = calculate_text_features(request.real_answer, request.student_answer)
    similarity = calculate_cosine_similarity(request.real_answer, request.student_answer)
    stop_words, non_stop_words = count_stop_words(request.student_answer)
    
    # Check similarity threshold
    if similarity < request.similarity_threshold:
        return {
            "predicted_grade": 0.0,
            "similarity_score": similarity,
            "is_below_threshold": True,
            "features": {
                "words": int(text_features[0]),
                "unique_words": int(text_features[1]),
                "sentences": int(text_features[2]),
                "long_words": int(text_features[3]),
                "stop_words": stop_words,
                "non_stop_words": non_stop_words,
                "similarity": similarity
            }
        }

    # Create feature array and scale it
    features = np.concatenate([
        text_features,
        [similarity, stop_words, non_stop_words]
    ]).reshape(1, -1)
    
    scaled_features = scaler.transform(features)
    
    # Make prediction
    prediction = model.predict(scaled_features)[0]
    
    return {
        "predicted_grade": float(prediction),
        "similarity_score": similarity,
        "is_below_threshold": False,
        "features": {
            "words": int(text_features[0]),
            "unique_words": int(text_features[1]),
            "sentences": int(text_features[2]),
            "long_words": int(text_features[3]),
            "stop_words": stop_words,
            "non_stop_words": non_stop_words,
            "similarity": similarity
        }
    }

# Run the app with uvicorn when this script is executed
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
