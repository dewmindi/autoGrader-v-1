import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../Header'
import { ArrowBigLeft, ArrowLeftCircleIcon, Upload } from 'lucide-react'

interface Exam {
  id: string
  title: string
  subject: string
  questions: any[]
}

export function EvaluationCreator() {
  const navigate = useNavigate()
  const [studentIndex, setStudentIndex] = useState('')
  const [selectedExam, setSelectedExam] = useState('')
  const [exams, setExams] = useState<Exam[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [attachments, setAttachments] = useState<string[]>([])

  useEffect(() => {
    const storedExams = JSON.parse(localStorage.getItem('exams') || '[]')
    setExams(storedExams)
  }, [])

  const handleFileUpload = async (index: number, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      setAttachments((prev) => {
        const newAttachments = [...prev]
        newAttachments[index] = base64
        return newAttachments
      })
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const selectedExamData = exams.find(exam => exam.id === selectedExam)
    if (!selectedExamData) return

    const evaluation = {
      id: crypto.randomUUID(),
      studentIndex,
      examId: selectedExam,
      examTitle: selectedExamData.title,
      answers,
      attachments,
      date: new Date().toISOString(),
      score: 0, // Will be calculated in result page
    }

    const evaluations = JSON.parse(localStorage.getItem('evaluations') || '[]')
    localStorage.setItem('evaluations', JSON.stringify([...evaluations, evaluation]))
    
    navigate(`/evaluation-result/${evaluation.id}`)
  }

  const currentExam = exams.find(exam => exam.id === selectedExam)

  return (
    <div>
      <ArrowBigLeft onClick={()=>navigate('/')}/>
      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Evaluate Student</h2>
            <p className="text-gray-600">Grade student answers for an exam</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Index
              </label>
              <input
                type="text"
                value={studentIndex}
                onChange={(e) => setStudentIndex(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
                placeholder="Enter student index number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Exam
              </label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select an exam</option>
                {exams.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.title} - {exam.subject}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {currentExam && (
            <div className="space-y-6">
              {currentExam.questions.map((question, index) => (
                <div key={index} className="p-6 bg-white rounded-lg border border-gray-200">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Question {index + 1}</h3>
                    <p className="text-gray-600 mt-1">{question.text}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Student Answer
                      </label>
                      <textarea
                        value={answers[index] || ''}
                        onChange={(e) => {
                          const newAnswers = [...answers]
                          newAnswers[index] = e.target.value
                          setAnswers(newAnswers)
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        rows={3}
                        placeholder="Paste student's answer here"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Answer Attachment (optional)
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="h-8 w-8 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span>
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*,.pdf"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleFileUpload(index, file)
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Grade
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
