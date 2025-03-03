import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';

interface PredictionResponse {
  mark: number;
  error?: string;
}

export function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Assuming the "evaluation ID" is passed through location state
  const { evaluation } = location.state as { evaluation: any };

  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrediction = async () => {
    try {
      setLoading(true);
      setError(null);

      // Send a request to the Flask backend for prediction
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          real_answer: evaluation.examTitle, // Assume this is part of the data you have
          student_answer: evaluation.studentAnswers[evaluation.examId], // Assume this is the answer you need to evaluate
        }),
      });

      const result: PredictionResponse = await response.json();
      
      if (response.ok) {
        setPrediction(result);
      } else {
        setError(result.error || 'Something went wrong!');
      }
    } catch (err) {
      setError('Failed to fetch the prediction!');
    } finally {
      setLoading(false);
    }
  };

  // Fetch the prediction once the component is mounted
  React.useEffect(() => {
    fetchPrediction();
  }, []);

  return (
    <div>
      <ArrowBigLeft onClick={() => navigate('/')} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Evaluation Result</h2>
            <p className="text-gray-600">Predicted mark for student answers</p>
          </div>

          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-600">{error}</div>
          ) : (
            <div className="text-center py-4">
              <h3 className="text-lg font-semibold">Predicted Mark: {prediction?.mark}</h3>
            </div>
          )}

          {/* Add any other necessary details */}
          <div className="flex justify-end">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
