import { NavLink, useNavigate } from 'react-router-dom'
import { useState, type ReactNode } from 'react'
import { useAuth } from '../auth/AuthContext'
import { Logo } from './Logo'

const psyLinks = [
  { to: '/psicologa', label: 'Inicio' },
  { to: '/psicologa/pacientes', label: 'Pacientes' },
  { to: '/psicologa/agenda', label: 'Agenda' },
  { to: '/psicologa/documentos', label: 'Documentos' },
  { to: '/psicologa/facturacion', label: 'Facturación' },
  { to: '/psicologa/ejercicios', label: 'Ejercicios' },
]

const patientLinks = [
  { to: '/app', label: 'Diario' },
  { to: '/app/ejercicios', label: 'Ejercicios' },
  { to: '/app/agenda', label: 'Agenda' },
  { to: '/app/perfil', label: 'Perfil' },
]

export function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const links = user?.role === 'psicologa' ? psyLinks : patientLinks

  function exit() {
    logout()
    navigate('/')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <Logo size={40} />
          <div>
            <div className="brand-word">MENTA</div>
            <small>{user?.role === 'psicologa' ? 'Gestión clínica' : 'Diario emocional'}</small>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className="muted" style={{ fontSize: '0.82rem' }}>
            {user?.name}
          </span>
          <button className="icon-btn menu-toggle" onClick={() => setOpen(true)} aria-label="Menú">
            ☰
          </button>
        </div>
      </header>

      {open ? (
        <div className="drawer" onClick={() => setOpen(false)}>
          <div className="drawer-panel" onClick={(event) => event.stopPropagation()}>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className="nav-link" onClick={() => setOpen(false)} end={link.to === '/psicologa' || link.to === '/app'}>
                {link.label}
              </NavLink>
            ))}
            <button className="btn btn-ghost" onClick={exit}>
              Cerrar sesión
            </button>
          </div>
        </div>
      ) : null}

      <div className={`layout ${user?.role === 'psicologa' ? 'with-sidebar' : ''}`}>
        {user?.role === 'psicologa' ? (
          <aside className="sidebar">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className="nav-link" end={link.to === '/psicologa'}>
                {link.label}
              </NavLink>
            ))}
            <button className="btn btn-ghost" onClick={exit}>
              Cerrar sesión
            </button>
          </aside>
        ) : null}

        <main className="content">{children}</main>
      </div>

      {user?.role === 'paciente' ? (
        <nav className="mobile-nav">
          {patientLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/app'}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </div>
  )
}
