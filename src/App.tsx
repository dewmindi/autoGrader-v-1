import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './components/auth/Login'
import { Signup } from './components/auth/Signup'
import { Dashboard } from './components/dashboard/Dashboard'
import { ExamCreator } from './components/exam/ExamCreator'
import { EvaluationCreator } from './components/evaluation/EvaluationCreator'
import { EvaluationResult } from './components/evaluation/EvaluationResult'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ExamDetails } from './components/exam/examDetails'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/login" replace />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
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

export default App
