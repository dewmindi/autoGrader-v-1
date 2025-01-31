import { BookOpen, Settings, LogOut, BookCheck } from 'lucide-react'
import { Navigate, Route, Router, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { EvaluationCreator } from './evaluation/EvaluationCreator'

export function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <h1 className="text-xl font-bold text-gray-900">AutoGrader</h1>
        </div>
        <div className="flex items-center gap-4">
          {user && <span className="text-gray-600">{user.name}</span>}
          <button onClick={() => navigate('evaluate')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            Evaluate
          </button>
          <button onClick={() => navigate('/evaluation-result/:evaluationId')}>
            Results
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <LogOut className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  )
}
