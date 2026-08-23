import { useState, type FormEvent } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { useClinic } from '../../data/ClinicContext'
import type { MoodLevel } from '../../types'

const MOODS: { level: MoodLevel; emoji: string; label: string }[] = [
  { level: 1, emoji: '😞', label: 'Muy bajo' },
  { level: 2, emoji: '🙁', label: 'Bajo' },
  { level: 3, emoji: '😐', label: 'Neutral' },
  { level: 4, emoji: '🙂', label: 'Bien' },
  { level: 5, emoji: '😄', label: 'Muy bien' },
]

export function DiarioPage() {
  const { user } = useAuth()
  const { moods, addMood } = useClinic()
  const [level, setLevel] = useState<MoodLevel>(3)
  const [note, setNote] = useState('')
  const mine = moods.filter((item) => item.patientId === user?.id)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!user) return
    addMood({
      id: `mood-${Date.now()}`,
      patientId: user.id,
      level,
      note,
      createdAt: new Date().toISOString(),
    })
    setNote('')
  }

  return (
    <>
      <h1 className="page-title">Diario emocional</h1>
      <p className="lede">Registra cómo te sientes. Tu psicóloga lo verá en tu ficha.</p>

      <form className="card" onSubmit={onSubmit}>
        <h3>¿Cómo estás hoy?</h3>
        <div className="mood-row">
          {MOODS.map((mood) => (
            <button
              key={mood.level}
              type="button"
              className={`mood-btn ${level === mood.level ? 'selected' : ''}`}
              onClick={() => setLevel(mood.level)}
              aria-label={mood.label}
              title={mood.label}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
        <label className="field">
          <span>Nota (opcional)</span>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
        <button className="btn btn-primary" type="submit">
          Guardar entrada
        </button>
      </form>

      <div className="grid" style={{ marginTop: 16 }}>
        {mine.map((entry, index) => (
          <article key={entry.id} className={`card ${index % 2 === 0 ? 'mint' : 'peach'}`}>
            <strong>
              {MOODS.find((m) => m.level === entry.level)?.emoji} Ánimo {entry.level}/5
            </strong>
            <p>{entry.note || 'Sin nota'}</p>
            <p className="muted">{new Date(entry.createdAt).toLocaleString('es-ES')}</p>
          </article>
        ))}
      </div>
    </>
  )
}
