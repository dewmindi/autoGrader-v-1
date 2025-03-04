import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../Header'
import { Plus, Book } from 'lucide-react'

interface Subject {
  id: string
  name: string
  examCount: number
}

interface Exam {
  id: string
  title: string
  subjectId: string
  subject: String
  date: string
  totalQuestions: number
  answer: String
}

export function Dashboard() {
  const [subject, setSubjects] = useState<Subject[]>([])
  const [exams, setExams] = useState<Exam[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    // Load subjects and exams from localStorage
    const storedSubjects = JSON.parse(localStorage.getItem('subject') || '[]')
    const storedExams = JSON.parse(localStorage.getItem('exams') || '[]')
    setSubjects(storedSubjects)
    setExams(storedExams)
  }, [])

  const handleCreateExam = () => {
    navigate('/create-exam')
  }

  function showExam(exam: Exam) {
    navigate('/created-exam', {state: { exam}})
    console.log(exam)
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Subjects</h2>
            <p className="text-gray-600">Manage your courses and exams</p>
          </div>
          <button
            onClick={handleCreateExam}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Create Exam
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div
              key={exam.id}
              onClick={() => showExam(exam)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Book className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{exam.subject}</h3>
              </div>
              <div className="text-sm text-gray-500">
                {exam.title} {exam.date === '' ? 'Due' : 'Due'}
              </div>
            </div>
          ))}
        </div>

        {exams.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No subjects yet</h3>
            <p className="text-gray-500">Create your first subject to get started</p>
          </div>
        )}
      </main>
    </div>
  )
}
