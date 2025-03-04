import { useLocation } from 'react-router-dom'

export function ExamDetails() {
  const location = useLocation()
  const { exam } = location.state || {}

  if (!exam) {
    return <div>Exam details not found.</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{exam.title}</h1>
      <p className="text-xl text-gray-700">Subject: {exam.subject}</p>
      <p className="text-sm text-gray-500">Date: {exam.date}</p>
      <p className="text-sm text-gray-500">Total Questions: {exam.questions?.length || 0}</p>
      
      {/* Render questions */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Questions:</h2>
        {exam.questions?.map((question: { id: string; text: string }, index: number) => (
          <div key={question.id}>{question.text}</div>
        ))}
      </div>
    </div>
  )
}
