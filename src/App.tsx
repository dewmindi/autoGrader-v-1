import './index.css'

import { BrowserRouter, Routes, Route, Navigate, Link} from 'react-router-dom'
import { Login } from './components/auth/Login/Login'
import { Signup } from './components/auth/Signup'
import { Dashboard } from './components/dashboard/Dashboard'
import { ExamCreator } from './components/exam/ExamCreator'
import { EvaluationCreator } from './components/evaluation/EvaluationCreator'
import { EvaluationResult } from './components/evaluation/EvaluationResult'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ExamDetails } from './components/exam/examDetails'
import { WavyBackground } from './components/ui/wavy-background'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <WavyBackground className="max-w-4xl mx-auto pb-40">
            <p className="text-6xl md:text-6xl lg:text-7xl text-white font-bold inter-var text-center">
              AutoGrader
            </p>
            <p className="text-base md:text-xl mt-4 text-white font-normal inter-var text-center">
              Revolutionizing Academic Grading with Intelligent Automation and Precision
            </p>
            <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 justify-center">
              <Link to="./components/auth/Login">
                <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
                  LogIn
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
                  Signup
                </button>
              </Link>
            </div>
          </WavyBackground>

          <Routes>
            <Route path="./components/auth/Login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-exam"
              element={
                <PrivateRoute>
                  <ExamCreator />
                </PrivateRoute>
              }
            />
            <Route
              path="/evaluate"
              element={
                <PrivateRoute>
                  <EvaluationCreator />
                </PrivateRoute>
              }
            />
            <Route
              path="/evaluation-result/:evaluationId"
              element={
                <PrivateRoute>
                  <EvaluationResult />
                </PrivateRoute>
              }
            />
            <Route
              path="/created-exam"
              element={
                <PrivateRoute>
                  <ExamDetails/>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}


