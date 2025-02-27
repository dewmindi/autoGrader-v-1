import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../Header'
import { Upload, Plus, Minus } from 'lucide-react'

interface Question {
  id: string
  text: string
  attachment?: string
}

interface Answer {
  id: string
  text: string
}

export function ExamCreator() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState("08:30")
  const [duration, setDuration] = useState('')
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: crypto.randomUUID(),
      text: '',
    },
  ])
  
  // Store answers separately, keyed by question id
  const [answers, setAnswers] = useState<Record<string, Answer>>({
    [questions[0].id]: { id: crypto.randomUUID(), text: '' }
  })

  const handleAddQuestion = () => {
    const newQuestionId = crypto.randomUUID()
    setQuestions([
      ...questions,
      {
        id: newQuestionId,
        text: '',
      },
    ])
    setAnswers({
      ...answers,
      [newQuestionId]: { id: crypto.randomUUID(), text: '' },
    })
  }

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
    const updatedAnswers = { ...answers }
    delete updatedAnswers[id]
    setAnswers(updatedAnswers)
  }

  const handleQuestionChange = (id: string, value: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, text: value } : q))
    )
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: { ...answers[questionId], text: value },
    })
  }

  const handleFileUpload = async (questionId: string, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      setQuestions(
        questions.map((q) =>
          q.id === questionId ? { ...q, attachment: base64 } : q
        )
      )
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const exam = {
      id: crypto.randomUUID(),
      title,
      subject,
      questions,
      date: new Date().toISOString(),
      time,
      duration,
      answers,
    }
    const exams = JSON.parse(localStorage.getItem('exams') || '[]')
    localStorage.setItem('exams', JSON.stringify([...exams, exam]))
    navigate('/')
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Exam</h2>
            <p className="text-gray-600">Set up your exam questions and answers</p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Exam Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <div className='grid grid-cols-3 gap-3 mb-4'>
              <div>
                <label htmlFor="date" className="block text-lg font-medium text-gray-700">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="py-1 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-lg font-medium text-gray-700">
                  Time
                </label>
                <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="py-1 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                />
              </div>

              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-lg font-medium text-gray-700">
                  Duration
                </label>
                <input
                  id="duration"
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="00h 00m"
                  className="py-1 px-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((question, qIndex) => (
              <div
                key={question.id}
                className="p-6 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Question {qIndex + 1}</h3>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(question.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <textarea
                    placeholder="Question text"
                    value={question.text}
                    onChange={(e) =>
                      handleQuestionChange(question.id, e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />

                  {/* Render a single answer for each question */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Answer text"
                      value={answers[question.id]?.text || ''}
                      onChange={(e) =>
                        handleAnswerChange(question.id, e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attachment (optional)
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
                            if (file) handleFileUpload(question.id, file)
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Plus className="h-5 w-5" />
              Add Question
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Create Exam
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
