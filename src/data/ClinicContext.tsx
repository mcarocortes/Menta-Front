import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  SEED_APPOINTMENTS,
  SEED_DOCUMENTS,
  SEED_EXERCISES,
  SEED_INVOICES,
  SEED_MOODS,
  SEED_NOTES,
  SEED_RESPONSES,
} from '../data/mock'
import type {
  Appointment,
  ClinicalNote,
  DocumentFile,
  Exercise,
  ExerciseResponse,
  Invoice,
  MoodEntry,
} from '../types'

const KEY = 'menta-clinic'

interface ClinicState {
  appointments: Appointment[]
  documents: DocumentFile[]
  invoices: Invoice[]
  exercises: Exercise[]
  responses: ExerciseResponse[]
  moods: MoodEntry[]
  notes: ClinicalNote[]
}

const seed: ClinicState = {
  appointments: SEED_APPOINTMENTS,
  documents: SEED_DOCUMENTS,
  invoices: SEED_INVOICES,
  exercises: SEED_EXERCISES,
  responses: SEED_RESPONSES,
  moods: SEED_MOODS,
  notes: SEED_NOTES,
}

function load(): ClinicState {
  const raw = localStorage.getItem(KEY)
  return raw ? (JSON.parse(raw) as ClinicState) : seed
}

interface ClinicValue extends ClinicState {
  addMood: (entry: MoodEntry) => void
  addExercise: (exercise: Exercise) => void
  addResponse: (response: ExerciseResponse) => void
  setInvoiceStatus: (id: string, status: Invoice['status']) => void
}

const ClinicContext = createContext<ClinicValue | null>(null)

export function ClinicProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ClinicState>(load)

  const persist = (next: ClinicState) => {
    localStorage.setItem(KEY, JSON.stringify(next))
    setState(next)
  }

  const value = useMemo<ClinicValue>(
    () => ({
      ...state,
      addMood(entry) {
        persist({ ...state, moods: [entry, ...state.moods] })
      },
      addExercise(exercise) {
        persist({ ...state, exercises: [exercise, ...state.exercises] })
      },
      addResponse(response) {
        persist({ ...state, responses: [response, ...state.responses] })
      },
      setInvoiceStatus(id, status) {
        persist({
          ...state,
          invoices: state.invoices.map((item) =>
            item.id === id ? { ...item, status } : item,
          ),
        })
      },
    }),
    [state],
  )

  return <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>
}

export function useClinic() {
  const ctx = useContext(ClinicContext)
  if (!ctx) throw new Error('useClinic debe usarse dentro de ClinicProvider')
  return ctx
}
