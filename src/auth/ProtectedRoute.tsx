import { Navigate } from 'react-router-dom'
import { useAuth, homeFor } from './AuthContext'
import type { Role } from '../types'
import type { ReactNode } from 'react'

export function ProtectedRoute({
  role,
  children,
}: {
  role: Role
  children: ReactNode
}) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/" replace />
  if (user.role !== role) return <Navigate to={homeFor(user.role)} replace />
  return children
}
