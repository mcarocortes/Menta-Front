import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { SEED_USERS } from '../data/mock'
import type { Role, User } from '../types'

const SESSION_KEY = 'menta-session'
const USERS_KEY = 'menta-users'

function readUsers(): User[] {
  const raw = localStorage.getItem(USERS_KEY)
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS))
    return SEED_USERS
  }
  return JSON.parse(raw) as User[]
}

function readSession(): User | null {
  const id = localStorage.getItem(SESSION_KEY)
  if (!id) return null
  return readUsers().find((user) => user.id === id) ?? null
}

interface AuthValue {
  user: User | null
  users: User[]
  login: (email: string, password: string) => { error: string } | { user: User }
  registerPatient: (payload: {
    name: string
    email: string
    password: string
    psychologistId: string
  }) => string | null
  logout: () => void
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(readUsers)
  const [user, setUser] = useState<User | null>(readSession)

  const value = useMemo<AuthValue>(
    () => ({
      user,
      users,
      login(email, password) {
        const found = users.find(
          (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
        )
        if (!found) return { error: 'Email o contraseña incorrectos.' }
        localStorage.setItem(SESSION_KEY, found.id)
        setUser(found)
        return { user: found }
      },
      registerPatient({ name, email, password, psychologistId }) {
        if (users.some((item) => item.email.toLowerCase() === email.toLowerCase())) {
          return 'Ese email ya está registrado.'
        }
        const next: User = {
          id: `pat-${Date.now()}`,
          name,
          email,
          password,
          role: 'paciente',
          psychologistId,
          avatarHue: '#A3E4D7',
        }
        const list = [...users, next]
        localStorage.setItem(USERS_KEY, JSON.stringify(list))
        localStorage.setItem(SESSION_KEY, next.id)
        setUsers(list)
        setUser(next)
        return null
      },
      logout() {
        localStorage.removeItem(SESSION_KEY)
        setUser(null)
      },
    }),
    [user, users],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}

export function homeFor(role: Role) {
  return role === 'psicologa' ? '/psicologa' : '/app'
}
