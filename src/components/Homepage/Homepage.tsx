import './index.css'
import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { WavyBackground } from '../../components/ui/wavy-background'
import { AuthProvider, useAuth } from '../../contexts/AuthContext';


// PrivateRoute component to protect routes
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/login" replace />
}

export default function Home() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          {/* Homepage */}
          <WavyBackground className="max-w-4xl mx-auto pb-40">
            <p className="text-6xl md:text-6xl lg:text-7xl text-white font-bold inter-var text-center">
              AutoGrader
            </p>
            <p className="text-base md:text-xl mt-4 text-white font-normal inter-var text-center">
              Revolutionizing Academic Grading with Intelligent Automation and Precision
            </p>
            <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 justify-center">
              <Link to="/login">
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

        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
