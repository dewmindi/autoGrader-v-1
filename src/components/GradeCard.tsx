interface GradeCardProps {
  subject: string
  grade: string
  date: string
  type: string
}

export function GradeCard({ subject, grade, date, type }: GradeCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{subject}</h3>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
        <span className="text-2xl font-bold text-indigo-600">{grade}</span>
      </div>
      <div className="text-sm text-gray-500">{date}</div>
    </div>
  )
}
