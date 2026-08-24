import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { homeFor, useAuth } from '../auth/AuthContext'
import { Logo } from '../components/Logo'

export function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('psicologa@menta.app')
  const [password, setPassword] = useState('menta123')
  const [error, setError] = useState<string | null>(null)

  if (user) return <Navigate to={homeFor(user.role)} replace />

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const result = login(email, password)
    if ('error' in result) {
      setError(result.error)
      return
    }
    navigate(homeFor(result.user.role))
  }

  return (
    <div className="auth-screen">
      <form className="auth-card" onSubmit={onSubmit}>
        <div className="logo-wrap">
          <Logo size={128} />
          <p className="tagline">Claridad clínica, bienestar consciente.</p>
        </div>

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
            required
          />
        </label>
        {error ? <p className="error">{error}</p> : null}
        <button className="btn btn-primary" type="submit">
          Entrar
        </button>
        <p className="muted" style={{ textAlign: 'center', marginTop: 16 }}>
          ¿Eres paciente nuevo? <Link to="/registro">Regístrate y elige tu psicóloga</Link>
        </p>
        <div className="hint">
          Cuentas de prueba (aún no hay API, todo vive en este navegador):
          <br />
          Psicóloga: psicologa@menta.app / menta123
          <br />
          Paciente: lucia@menta.app / menta123
        </div>
      </form>
    </div>
  )
}
