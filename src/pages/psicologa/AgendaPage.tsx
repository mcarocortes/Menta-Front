import { useAuth } from '../../auth/AuthContext'
import { useClinic } from '../../data/ClinicContext'
import { whatsappUrl } from '../../data/mock'

export function AgendaPage() {
  const { users } = useAuth()
  const { appointments } = useClinic()

  return (
    <>
      <h1 className="page-title">Agenda</h1>
      <p className="lede">
        Si la sesión es online, abre WhatsApp. Si es presencial, ves el lugar de la consulta.
      </p>
      <div className="list">
        {appointments.map((item) => {
          const patient = users.find((u) => u.id === item.patientId)
          const text = `Hola ${patient?.name}, te escribo por tu sesión de Menta el ${item.date} a las ${item.time}.`
          return (
            <article key={item.id} className="card">
              <div className="person">
                <div className="avatar" style={{ background: '#A3E4D7' }}>
                  {patient?.name.slice(0, 1)}
                </div>
                <div>
                  <strong>{patient?.name}</strong>
                  <div className="muted">
                    {item.date} · {item.time} · {item.notes}
                  </div>
                </div>
                <span className={`chip ${item.mode === 'online' ? 'chip-ok' : 'chip-warn'}`}>
                  {item.mode}
                </span>
              </div>
              <div className="row-actions">
                {item.mode === 'online' && item.whatsapp ? (
                  <a
                    className="btn btn-primary"
                    href={whatsappUrl(item.whatsapp, text)}
                    target="_blank"
                    rel="noreferrer"
                    style={{ width: 'auto' }}
                  >
                    Abrir WhatsApp
                  </a>
                ) : (
                  <p className="muted">{item.location}</p>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}
