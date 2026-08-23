import { useAuth } from '../../auth/AuthContext'
import { useClinic } from '../../data/ClinicContext'
import { whatsappUrl } from '../../data/mock'

export function AgendaPacientePage() {
  const { user, users } = useAuth()
  const { appointments } = useClinic()
  const mine = appointments.filter((item) => item.patientId === user?.id)
  const psychologist = users.find((item) => item.id === user?.psychologistId)

  return (
    <>
      <h1 className="page-title">Agenda</h1>
      <p className="lede">Tus próximas sesiones con {psychologist?.name}.</p>
      {mine.length === 0 ? <p className="muted">No hay citas cargadas para esta cuenta de prueba.</p> : null}
      <div className="list">
        {mine.map((item) => {
          const text = `Hola ${psychologist?.name}, confirmo la sesión de Menta el ${item.date} a las ${item.time}.`
          return (
            <article key={item.id} className="card">
              <strong>
                {item.date} · {item.time}
              </strong>
              <p className="muted">{item.notes}</p>
              {item.mode === 'online' && item.whatsapp ? (
                <a
                  className="btn btn-primary"
                  href={whatsappUrl(item.whatsapp, text)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Videollamada por WhatsApp
                </a>
              ) : (
                <p>{item.location}</p>
              )}
            </article>
          )
        })}
      </div>
    </>
  )
}
