from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)

CORS(app)

# Load the pre-trained model (make sure the path is correct)
model = pickle.load(open('random_forest_model.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from the request
        data = request.get_json()
        real_answer = data.get('real_answer')
        student_answer = data.get('student_answer')

        # Preprocess the input as needed (depending on your model)
        prediction = model.predict([[real_answer, student_answer]])

        # Return the predicted mark as a response
        return jsonify({'mark': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)