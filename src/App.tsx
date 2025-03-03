import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './components/auth/Login'
import { Signup } from './components/auth/Signup'
import { Dashboard } from './components/dashboard/Dashboard'
import { ExamCreator } from './components/exam/ExamCreator'
import { EvaluationCreator } from './components/evaluation/EvaluationCreator'
import { EvaluationResult } from './components/evaluation/EvaluationResult'
import { AuthProvider} from './contexts/AuthContext'
import { ExamDetails } from './components/exam/ExamDetails'

// PrivateRoute component to protect routes
function PrivateRoute({ children }: { children: React.ReactNode }) {
  // Check if the user is logged in from localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  
  // If the user is not logged in, redirect them to the login page
  if (isLoggedIn !== 'true') {
    return <Navigate to="/login" replace />
  }

  // If logged in, render the protected route
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
            
            {/* Protected Routes */}
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