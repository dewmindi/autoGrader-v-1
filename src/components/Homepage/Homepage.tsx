import './index.css'
import { Link } from 'react-router-dom'
import { WavyBackground } from '../../components/ui/wavy-background'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Homepage */}
      <WavyBackground className="max-w-4xl mx-auto pb-40">
       <div>
        <p className="mt-10 text-6xl md:text-6xl lg:text-7xl text-white font-bold inter-var text-center">
          AutoGrader
        </p>
        <p className="mt-10 text-base md:text-xl text-white font-normal inter-var text-center">
          Revolutionizing Academic Grading with Intelligent Automation and Precision
        </p>
        <div className="mt-10  flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 justify-center">
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
        <div>
          <footer className="text-center mt-40">
            <p className="text-lg text-white">
              © 2025 AutoGrader™. All rights reserved.
            </p>
          </footer>
        </div>
        </div> 
      </WavyBackground>   
    </div>
  )
}
