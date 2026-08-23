export type Role = 'psicologa' | 'paciente'

export type SessionMode = 'online' | 'presencial'

export type ExerciseKind = 'texto' | 'seleccion_multiple' | 'formulario' | 'emocion_diaria'

export type InvoiceStatus = 'pagado' | 'pendiente'

export type MoodLevel = 1 | 2 | 3 | 4 | 5

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: Role
  psychologistId?: string
  phone?: string
  avatarHue?: string
}

export interface Appointment {
  id: string
  patientId: string
  psychologistId: string
  date: string
  time: string
  mode: SessionMode
  location?: string
  whatsapp?: string
  notes?: string
}

export interface DocumentFile {
  id: string
  patientId: string
  title: string
  kind: string
  updatedAt: string
}

export interface Invoice {
  id: string
  patientId: string
  concept: string
  amount: number
  date: string
  status: InvoiceStatus
}

export interface Exercise {
  id: string
  psychologistId: string
  patientId: string
  title: string
  kind: ExerciseKind
  prompt: string
  options?: string[]
  createdAt: string
}

export interface ExerciseResponse {
  id: string
  exerciseId: string
  patientId: string
  value: string
  submittedAt: string
}

export interface MoodEntry {
  id: string
  patientId: string
  level: MoodLevel
  note: string
  createdAt: string
}

export interface ClinicalNote {
  id: string
  patientId: string
  body: string
  createdAt: string
}
