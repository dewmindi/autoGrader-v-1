import { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u: any) => u.email === email && u.password === password)
    if (!user) {
      throw new Error('Invalid credentials')
    }
    const userData = { id: user.id, email: user.email, name: user.name }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const signup = async (email: string, password: string, name: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.some((u: any) => u.email === email)) {
      throw new Error('Email already exists')
    }
    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
      name,
    }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    const userData = { id: newUser.id, email: newUser.email, name: newUser.name }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
