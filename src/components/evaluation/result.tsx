import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Evaluation {
  id: string
  studentIndex: string
  examId: string
  examTitle: string
  studentAnswers: any
  attachments: string[]
  date: string
  score: number
}

export function EvaluationResult() {
  console.log('EvaluationResult Component Rendered') // Check if the component renders
  
  const { id } = useParams<{ id: string }>()
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)

  useEffect(() => {
    console.log('useEffect Triggered') // Check if the useEffect is running
    console.log('Evaluation ID from URL:', id) // Debug log to check if the id is being passed correctly

    // Fetch the evaluation data using the ID from the URL
    const evaluations = JSON.parse(localStorage.getItem('evaluations') || '[]')
    console.log('Evaluations from localStorage:', evaluations) // Check localStorage contents

    const selectedEvaluation = evaluations.find((evaluation: Evaluation) => evaluation.id === id)
    console.log('Selected Evaluation:', selectedEvaluation) // Debug log

    if (selectedEvaluation) {
      setEvaluation(selectedEvaluation)
    } else {
      console.error("Evaluation not found.")
    }
  }, [id]) // Re-run the effect if the ID changes

  if (!evaluation) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <div>
      <h1>Evaluation Result</h1>
      <p>Student Index: {evaluation.studentIndex}</p>
      <p>Exam: {evaluation.examTitle}</p>
      <p>Score: {evaluation.score}</p>
      
      {/* Render the student's answers and attachments */}
      <div>
        {Object.keys(evaluation.studentAnswers).map((questionId) => (
          <div key={questionId}>
            <h3>Question {questionId}</h3>
            <p><strong>Student Answer:</strong> {evaluation.studentAnswers[questionId]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
