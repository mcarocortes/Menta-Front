import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useClinic } from '../../data/ClinicContext'

export function FichaPacientePage() {
  const { id } = useParams()
  const { users } = useAuth()
  const { notes, moods, exercises, invoices } = useClinic()
  const patient = users.find((item) => item.id === id)

  if (!patient) {
    return <p>Paciente no encontrado. <Link to="/psicologa/pacientes">Volver</Link></p>
  }

  return (
    <>
      <h1 className="page-title">Ficha clínica</h1>
      <p className="lede">{patient.name} · {patient.email}</p>

      <div className="grid grid-2">
        <section className="card">
          <h3>Notas clínicas</h3>
          {notes.filter((n) => n.patientId === patient.id).map((note) => (
            <p key={note.id} className="muted">
              {note.createdAt}: {note.body}
            </p>
          ))}
        </section>
        <section className="card mint">
          <h3>Diario reciente</h3>
          {moods.filter((m) => m.patientId === patient.id).map((mood) => (
            <p key={mood.id}>
              Ánimo {mood.level}/5 — {mood.note}
            </p>
          ))}
        </section>
        <section className="card">
          <h3>Ejercicios asignados</h3>
          {exercises.filter((e) => e.patientId === patient.id).map((ex) => (
            <div key={ex.id} className="list-item">
              <strong>{ex.title}</strong>
              <span className="chip">{ex.kind}</span>
            </div>
          ))}
        </section>
        <section className="card peach">
          <h3>Facturación</h3>
          {invoices.filter((i) => i.patientId === patient.id).map((inv) => (
            <div key={inv.id} className="list-item">
              <span>{inv.concept}</span>
              <span className={`chip ${inv.status === 'pagado' ? 'chip-ok' : 'chip-warn'}`}>
                {inv.status}
              </span>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}
