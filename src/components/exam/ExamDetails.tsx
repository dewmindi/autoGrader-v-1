import { useLocation, Link} from 'react-router-dom'

export function ExamDetails() {
  const location = useLocation()
  const { exam } = location.state || {}

  if (!exam) {
    return <div>Exam details not found.</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b bg-white">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-3xl w-full">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
          {exam.title}
        </h1>

        {/* Exam Info */}
        <div className="flex flex-col md:flex-row justify-between items-center text-lg text-gray-700 mb-6 border-b pb-4">
          <p className="font-medium">
            📘 Subject: <span className="font-semibold focus:ring-indigo-500">{exam.subject}</span>
          </p>
          <p className="font-medium">
            📅 Date: <span className="font-semibold focus:ring-indigo-500">{exam.date}</span>
          </p>
          <p className="font-medium">
            ❓ Questions: <span className="font-semibold focus:ring-indigo-500">{exam.questions?.length || 0}</span>
          </p>
        </div>

        {/* Questions Section */}
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
            📝 Questions
          </h2>
          <div className="space-y-4">
            {exam.questions?.map((question: { id: string; text: string }, index: number) => (
              <div
                key={question.id}
                className="p-4 bg-gray-50 border-l-4 focus:ring-indigo-500 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <p className="text-gray-800 font-medium">
                  <span className="font-bold focus:ring-indigo-500">Q{index + 1}:</span> {question.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-center">
            <Link to="/">
                <button  className="px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold shadow-md transition duration-300">
                  Go Back
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
}