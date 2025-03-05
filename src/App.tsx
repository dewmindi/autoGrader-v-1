import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './components/auth/Login'
import { Signup } from './components/auth/Signup'
import { Dashboard } from './components/dashboard/Dashboard'
import { ExamCreator } from './components/exam/ExamCreator'
import { EvaluationCreator } from './components/evaluation/EvaluationCreator'
import { EvaluationResult } from './components/evaluation/EvaluationResult'
import { AuthProvider } from './contexts/AuthContext'
import { ExamDetails } from './components/exam/ExamDetails'
import { DispResults } from './components/studentResults/DispResults'
import Home from './components/Homepage/Homepage'
import { StudentResults } from './components/studentResults/showStudentList'


// PrivateRoute component to protect routes
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Default Route to Homepage */}
            <Route path="/" element={<Home />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
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
              path="/evaluation-result/:id"
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
                  <ExamDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/display-results"
              element={
                <PrivateRoute>
                  <DispResults />
                </PrivateRoute>
              }
            />
            <Route
              path="/display-students"
              element={
                <PrivateRoute>
                  <StudentResults />
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
