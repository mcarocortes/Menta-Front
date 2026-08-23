import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useClinic } from '../../data/ClinicContext'
import { WEEK_ACTIVITY, WEEK_LABELS } from '../../data/mock'

export function DashboardPage() {
  const { users } = useAuth()
  const { invoices, appointments } = useClinic()
  const patients = users.filter((item) => item.role === 'paciente')
  const pending = invoices.filter((item) => item.status === 'pendiente').length
  const max = Math.max(...WEEK_ACTIVITY)

  return (
    <>
      <h1 className="page-title">Gestión clínica</h1>
      <p className="lede">Resumen de pacientes, sesiones y cobros. Datos de prueba hasta que exista la API.</p>

      <div className="grid grid-2">
        <section className="card">
          <h3>Actividad de la semana</h3>
          <div className="bars">
            {WEEK_ACTIVITY.map((value, index) => (
              <div key={WEEK_LABELS[index]}>
                <div className="bar" style={{ height: `${(value / max) * 120}px` }} />
                <div className="bar-label">{WEEK_LABELS[index]}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="card peach">
          <h3>Tareas clínicas</h3>
          <label className="check">
            <input type="checkbox" defaultChecked /> Revisar diario de Lucía
          </label>
          <label className="check">
            <input type="checkbox" /> Preparar sesión online de María
          </label>
          <label className="check">
            <input type="checkbox" /> Marcar facturas pendientes ({pending})
          </label>
        </section>
      </div>

      <div className="grid grid-2" style={{ marginTop: 16 }}>
        <section className="card">
          <h3>Pacientes</h3>
          <div className="list">
            {patients.map((patient) => (
              <Link key={patient.id} className="list-item" to={`/psicologa/pacientes/${patient.id}`}>
                <div className="person">
                  <div className="avatar" style={{ background: patient.avatarHue ?? '#A3E4D7' }}>
                    {patient.name.slice(0, 1)}
                  </div>
                  <div>
                    <strong>{patient.name}</strong>
                    <div className="muted">{patient.email}</div>
                  </div>
                </div>
                <span className="chip chip-ok">Activo</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="card mint">
          <h3>Próximas citas</h3>
          <div className="list">
            {appointments.slice(0, 3).map((item) => {
              const patient = patients.find((p) => p.id === item.patientId)
              return (
                <div key={item.id} className="list-item">
                  <div>
                    <strong>{patient?.name}</strong>
                    <div className="muted">
                      {item.date} · {item.time} · {item.mode}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </>
  )
}
