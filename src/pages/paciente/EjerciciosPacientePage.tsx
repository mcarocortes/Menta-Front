import { useState, type FormEvent } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { useClinic } from '../../data/ClinicContext'

export function EjerciciosPacientePage() {
  const { user } = useAuth()
  const { exercises, responses, addResponse } = useClinic()
  const mine = exercises.filter((item) => item.patientId === user?.id)
  const [drafts, setDrafts] = useState<Record<string, string>>({})

  function submit(event: FormEvent, exerciseId: string) {
    event.preventDefault()
    if (!user) return
    addResponse({
      id: `res-${Date.now()}`,
      exerciseId,
      patientId: user.id,
      value: drafts[exerciseId] ?? '',
      submittedAt: new Date().toISOString(),
    })
  }

  return (
    <>
      <h1 className="page-title">Ejercicios</h1>
      <p className="lede">Lo que te ha asignado tu psicóloga. Al enviarlo, ella lo ve en su portal.</p>
      {mine.length === 0 ? <p className="muted">Aún no tienes ejercicios.</p> : null}
      <div className="list">
        {mine.map((ex) => {
          const answer = responses.find((r) => r.exerciseId === ex.id && r.patientId === user?.id)
          return (
            <form key={ex.id} className="card" onSubmit={(event) => submit(event, ex.id)}>
              <h3>{ex.title}</h3>
              <p>{ex.prompt}</p>
              {answer ? (
                <p className="chip chip-ok">Enviado: {answer.value}</p>
              ) : (
                <>
                  {ex.kind === 'seleccion_multiple' ? (
                    <label className="field">
                      <span>Elige una opción</span>
                      <select
                        value={drafts[ex.id] ?? ''}
                        onChange={(e) => setDrafts({ ...drafts, [ex.id]: e.target.value })}
                        required
                      >
                        <option value="">Selecciona</option>
                        {ex.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    <label className="field">
                      <span>Tu respuesta</span>
                      <textarea
                        value={drafts[ex.id] ?? ''}
                        onChange={(e) => setDrafts({ ...drafts, [ex.id]: e.target.value })}
                        required
                      />
                    </label>
                  )}
                  <button className="btn btn-primary" type="submit">
                    Enviar
                  </button>
                </>
              )}
            </form>
          )
        })}
      </div>
    </>
  )
}
