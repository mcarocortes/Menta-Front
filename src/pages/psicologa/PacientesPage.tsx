import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

export function PacientesPage() {
  const { users } = useAuth()
  const patients = users.filter((item) => item.role === 'paciente')

  return (
    <>
      <h1 className="page-title">Pacientes</h1>
      <p className="lede">Abre la ficha clínica de cada persona.</p>
      <div className="list">
        {patients.map((patient) => (
          <Link key={patient.id} className="list-item card" to={`/psicologa/pacientes/${patient.id}`}>
            <div className="person">
              <div className="avatar" style={{ background: patient.avatarHue ?? '#EDBB99' }}>
                {patient.name.slice(0, 1)}
              </div>
              <div>
                <strong>{patient.name}</strong>
                <div className="muted">Ficha clínica · diario · ejercicios</div>
              </div>
            </div>
            <span className="chip chip-ok">Ver ficha</span>
          </Link>
        ))}
      </div>
    </>
  )
}
