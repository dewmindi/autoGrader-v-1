import { useLocation } from 'react-router-dom'

interface StudentList {
  id: string
  name: string
  score: number
}

interface Exam {
  id: string
  title: string
  subject: string
  date: string
  totalQuestions: number    
  TotalStudents: number
  totalScore: number
  time: string
}

export function StudentResults() {
  const location = useLocation()
  const { exam }: { exam: Exam } = location.state
  const students: StudentList[] = generateDummyStudentResults(exam) // Use StudentList instead of StudentResult

  return (
    <div>
      <header className="p-4 bg-blue-600 text-white">
        <h1 className="text-xl">{exam.title} - {exam.subject}</h1>
        <p>{exam.date}</p>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Results</h2>
        {students.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No student results available</h3>
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Student Index</th>
                <th className="py-2 px-4 text-left">Score</th>
              </tr>
            </thead>
            <tbody> 
              {students.map((student, index) => (
                <tr key={student.id} className="border-b">
                  <td className="py-2 px-4">{student.name}</td>
                  <td className="py-2 px-4">{student.score} / {exam.totalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  )
}

function generateDummyStudentResults(exam: Exam): StudentList[] {  // Change StudentResult[] to StudentList[] here
  const students: StudentList[] = []
  for (let i = 1; i <= exam.TotalStudents; i++) {
    students.push({
      id: i.toString(),
      name: `Student ${i}`,
      score: Math.floor(Math.random() * (exam.totalScore + 1)) // Random score between 0 and totalScore
    })
  }
  return students
}
