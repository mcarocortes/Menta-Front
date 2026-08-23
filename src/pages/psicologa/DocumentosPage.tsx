import { useAuth } from '../../auth/AuthContext'
import { useClinic } from '../../data/ClinicContext'

export function DocumentosPage() {
  const { users } = useAuth()
  const { documents } = useClinic()

  return (
    <>
      <h1 className="page-title">Documentos</h1>
      <p className="lede">Informes, consentimientos y tests digitalizados. Subida real cuando exista el backend.</p>
      <div className="list">
        {documents.map((doc) => {
          const patient = users.find((u) => u.id === doc.patientId)
          return (
            <article key={doc.id} className="list-item card">
              <div>
                <strong>{doc.title}</strong>
                <div className="muted">
                  {patient?.name} · {doc.kind} · {doc.updatedAt}
                </div>
              </div>
              <span className="chip chip-ok">{doc.kind}</span>
            </article>
          )
        })}
      </div>
    </>
  )
}
