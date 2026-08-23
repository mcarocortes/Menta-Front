import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { homeFor, useAuth } from '../auth/AuthContext'
import { Logo } from '../components/Logo'

export function RegisterPage() {
  const { user, users, registerPatient } = useAuth()
  const navigate = useNavigate()
  const psychologists = users.filter((item) => item.role === 'psicologa')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [psychologistId, setPsychologistId] = useState(psychologists[0]?.id ?? '')
  const [error, setError] = useState<string | null>(null)

  if (user) return <Navigate to={homeFor(user.role)} replace />

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const message = registerPatient({ name, email, password, psychologistId })
    if (message) {
      setError(message)
      return
    }
    navigate('/app')
  }

  return (
    <div className="auth-screen">
      <form className="auth-card" onSubmit={onSubmit}>
        <div className="logo-wrap">
          <Logo size={56} />
          <h1>Crear cuenta de paciente</h1>
          <p className="tagline">Elige a tu psicóloga asignada para vincular tu diario.</p>
        </div>
        <label className="field">
          <span>Nombre</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="field">
          <span>Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>
        <label className="field">
          <span>Contraseña</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            minLength={6}
            required
          />
        </label>
        <label className="field">
          <span>Psicóloga asignada</span>
          <select
            value={psychologistId}
            onChange={(e) => setPsychologistId(e.target.value)}
            required
          >
            {psychologists.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        {error ? <p className="error">{error}</p> : null}
        <button className="btn btn-primary" type="submit">
          Registrarme
        </button>
        <p className="muted" style={{ textAlign: 'center', marginTop: 16 }}>
          ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </form>
    </div>
  )
}
