import { useState, type FormEvent } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { useClinic } from '../../data/ClinicContext'
import type { ExerciseKind } from '../../types'

export function EjerciciosPage() {
  const { users } = useAuth()
  const { exercises, responses, addExercise } = useClinic()
  const patients = users.filter((u) => u.role === 'paciente')
  const [title, setTitle] = useState('')
  const [kind, setKind] = useState<ExerciseKind>('texto')
  const [prompt, setPrompt] = useState('')
  const [patientId, setPatientId] = useState(patients[0]?.id ?? '')
  const [options, setOptions] = useState('Muy baja, Baja, Media, Alta, Muy alta')

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    addExercise({
      id: `ex-${Date.now()}`,
      psychologistId: 'psy-1',
      patientId,
      title,
      kind,
      prompt,
      options: kind === 'seleccion_multiple' ? options.split(',').map((item) => item.trim()) : undefined,
      createdAt: new Date().toISOString().slice(0, 10),
    })
    setTitle('')
    setPrompt('')
  }

  return (
    <>
      <h1 className="page-title">Ejercicios</h1>
      <p className="lede">
        Crea formularios, texto, selección múltiple o check-in emocional. El paciente los ve en su portal.
      </p>

      <form className="card" onSubmit={onSubmit} style={{ marginBottom: 16 }}>
        <h3>Asignar ejercicio</h3>
        <label className="field">
          <span>Paciente</span>
          <select value={patientId} onChange={(e) => setPatientId(e.target.value)}>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Título</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label className="field">
          <span>Tipo</span>
          <select value={kind} onChange={(e) => setKind(e.target.value as ExerciseKind)}>
            <option value="texto">Texto libre</option>
            <option value="seleccion_multiple">Selección múltiple</option>
            <option value="formulario">Formulario</option>
            <option value="emocion_diaria">Emoción diaria</option>
          </select>
        </label>
        <label className="field">
          <span>Enunciado</span>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} required />
        </label>
        {kind === 'seleccion_multiple' ? (
          <label className="field">
            <span>Opciones (separadas por coma)</span>
            <input value={options} onChange={(e) => setOptions(e.target.value)} />
          </label>
        ) : null}
        <button className="btn btn-primary" type="submit">
          Crear y asignar
        </button>
      </form>

      <div className="list">
        {exercises.map((ex) => {
          const patient = users.find((u) => u.id === ex.patientId)
          const answer = responses.find((r) => r.exerciseId === ex.id)
          return (
            <article key={ex.id} className="card">
              <strong>{ex.title}</strong>
              <div className="muted">
                {patient?.name} · {ex.kind}
              </div>
              <p>{ex.prompt}</p>
              {answer ? (
                <p className="chip chip-ok">Respuesta: {answer.value}</p>
              ) : (
                <p className="chip chip-warn">Sin respuesta todavía</p>
              )}
            </article>
          )
        })}
      </div>
    </>
  )
}
