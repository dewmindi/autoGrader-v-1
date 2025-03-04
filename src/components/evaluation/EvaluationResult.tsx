import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Header } from '../Header'
import { CheckCircle, XCircle } from 'lucide-react'

interface Evaluation {
  id: string
  studentIndex: string
  examId: string
  examTitle: string
  answers: string[]
  attachments: string[]
  date: string
  score: number
}

interface Exam {
  id: string
  title: string
  questions: {
    text: string
    options: string[]
    correctOption: number
  }[]
}

export function EvaluationResult() {
  const { evaluationId } = useParams()
  const navigate = useNavigate()
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const [exam, setExam] = useState<Exam | null>(null)
  const [score, setScore] = useState<number>(0)

  useEffect(() => {
    const evaluations = JSON.parse(localStorage.getItem('evaluations') || '[]')
    const currentEvaluation = evaluations.find((e: Evaluation) => e.id === evaluationId)
    
    if (currentEvaluation) {
      setEvaluation(currentEvaluation)
      
      const exams = JSON.parse(localStorage.getItem('exams') || '[]')
      const relatedExam = exams.find((e: Exam) => e.id === currentEvaluation.examId)
      setExam(relatedExam)

      // Calculate score
      let correctAnswers = 0
      currentEvaluation.answers.forEach((answer, index) => {
        if (relatedExam && answer.trim().toLowerCase() === relatedExam.questions[index].options[relatedExam.questions[index].correctOption].toLowerCase()) {
          correctAnswers++
        }
      })
      const finalScore = (correctAnswers / relatedExam.questions.length) * 100
      setScore(finalScore)

      // Update evaluation with score
      const updatedEvaluations = evaluations.map((e: Evaluation) => 
        e.id === evaluationId ? { ...e, score: finalScore } : e
      )
      localStorage.setItem('evaluations', JSON.stringify(updatedEvaluations))
    }
  }, [evaluationId])

  if (!evaluation || !exam) {
    return (
      <div>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </main>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Evaluation Result</h2>
                <p className="text-gray-600">Student Index: {evaluation.studentIndex}</p>
                <p className="text-gray-600">Exam: {evaluation.examTitle}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-indigo-600">
                  {score.toFixed(1)}%
                </div>
                <p className="text-sm text-gray-500">Final Score</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {exam.questions.map((question, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Question {index + 1}</h3>
                  <p className="text-gray-600 mt-1">{question.text}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Student's Answer:</p>
                    <p className="mt-1 text-gray-900">{evaluation.answers[index] || 'No answer provided'}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">Correct Answer:</p>
                    <p className="mt-1 text-gray-900">{question.options[question.correctOption]}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {evaluation.answers[index]?.trim().toLowerCase() === 
                      question.options[question.correctOption].toLowerCase() ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-green-500">Correct</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-red-500">Incorrect</span>
                      </>
                    )}
                  </div>

                  {evaluation.attachments[index] && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Attachment:</p>
                      <img 
                        src={evaluation.attachments[index]} 
                        alt={`Answer attachment ${index + 1}`}
                        className="max-w-full h-auto rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
