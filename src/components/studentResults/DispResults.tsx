import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../Header'
import { Book } from 'lucide-react'
import { ArrowBigLeft} from 'lucide-react';

interface Subject {
  id: string
  name: string
  examCount: number
}

interface Exam {
  id: string
  title: string
  subjectId: string
  subject: string
  date: string
  totalQuestions: number
  TotalStudents: number
  totalScore: number
  time: string
}

export function DispResults() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [exams, setExams] = useState<Exam[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    // Dummy subjects and exams data
    const dummySubjects: Subject[] = [
      { id: '1', name: 'Math', examCount: 3 },
      { id: '2', name: 'History', examCount: 2 },
      { id: '3', name: 'Science', examCount: 1 }
    ]

    const dummyExams: Exam[] = [
      {
        id: '1',
        title: 'Midterm Exam',
        subjectId: '1',
        subject: 'Math',
        date: '2025-03-15',
        totalQuestions: 50,
        TotalStudents: 45,
        totalScore: 50,
        time: '9:00'
      },
      {
        id: '2',
        title: 'Final Exam',
        subjectId: '2',
        subject: 'History',
        date: '2025-05-10',
        totalQuestions: 60,
        TotalStudents: 50,
        totalScore: 60,
        time: '2:00'
      },
      {
        id: '3',
        title: 'Quiz Exam',
        subjectId: '3',
        subject: 'Science',
        date: '2025-04-01',
        totalQuestions: 30,
        TotalStudents: 27,
        totalScore: 30,
        time: '10:00'
      }
    ]

    setSubjects(dummySubjects)
    setExams(dummyExams)
  }, [])

  function showStudent(exam: Exam) {
    navigate('/display-students', { state: { exam } })
    console.log(exam)
  }

  return (
    <div>
      <Header />
      <ArrowBigLeft onClick={() => navigate('/dashboard')} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Exams Results</h2>
            <p className="text-gray-600">View Exam scores and performance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div
              key={exam.id}
              onClick={() => showStudent(exam)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Book className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{exam.subject}</h3>
              </div>

              {/* Exam Title */}
              <div className="text-sm text-gray-500 mb-2">
                <strong>{exam.title}</strong> ({exam.date}) 
              </div>

              {/* Score & Total Score */}
              <div className="text-sm text-gray-700 mb-4">
                <span className="font-semibold">TotalStudents: </span>
                {exam.TotalStudents} / {exam.totalScore}
              </div>

              {/* Exam Details */}
              <div className="text-sm text-gray-500">
                <div><strong>Total Questions: </strong>{exam.totalQuestions}</div>
                <div><strong>Time: </strong>{exam.time}</div>
              </div>
            </div>
          ))}
        </div>

        {exams.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No exams results yet</h3>
            <p className="text-gray-500">Create and complete your first exam to see results</p>
          </div>
        )}
      </main>
    </div>
  )
}
