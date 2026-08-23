import type {
  Appointment,
  ClinicalNote,
  DocumentFile,
  Exercise,
  ExerciseResponse,
  Invoice,
  MoodEntry,
  User,
} from '../types'

export const PSYCHOLOGIST: User = {
  id: 'psy-1',
  name: 'Dra. Elena Ruiz',
  email: 'psicologa@menta.app',
  password: 'menta123',
  role: 'psicologa',
  phone: '34600111222',
}

export const PATIENTS: User[] = [
  {
    id: 'pat-1',
    name: 'Lucía Martín',
    email: 'lucia@menta.app',
    password: 'menta123',
    role: 'paciente',
    psychologistId: 'psy-1',
    phone: '34600999888',
    avatarHue: '#A3E4D7',
  },
  {
    id: 'pat-2',
    name: 'Carlos Vega',
    email: 'carlos@menta.app',
    password: 'menta123',
    role: 'paciente',
    psychologistId: 'psy-1',
    phone: '34600777666',
    avatarHue: '#EDBB99',
  },
  {
    id: 'pat-3',
    name: 'María Soto',
    email: 'maria@menta.app',
    password: 'menta123',
    role: 'paciente',
    psychologistId: 'psy-1',
    phone: '34600555444',
    avatarHue: '#A3E4D7',
  },
]

export const SEED_USERS: User[] = [PSYCHOLOGIST, ...PATIENTS]

export const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    patientId: 'pat-1',
    psychologistId: 'psy-1',
    date: '2026-08-25',
    time: '10:00',
    mode: 'online',
    whatsapp: '34600111222',
    notes: 'Seguimiento semanal',
  },
  {
    id: 'apt-2',
    patientId: 'pat-2',
    psychologistId: 'psy-1',
    date: '2026-08-25',
    time: '12:30',
    mode: 'presencial',
    location: 'Consulta Menta, C/ Alcalá 120, Madrid',
    notes: 'Primera entrevista',
  },
  {
    id: 'apt-3',
    patientId: 'pat-3',
    psychologistId: 'psy-1',
    date: '2026-08-26',
    time: '17:00',
    mode: 'online',
    whatsapp: '34600111222',
    notes: 'Revisión de ejercicios',
  },
]

export const SEED_DOCUMENTS: DocumentFile[] = [
  {
    id: 'doc-1',
    patientId: 'pat-1',
    title: 'Informe de evaluación inicial',
    kind: 'Informe',
    updatedAt: '2026-08-10',
  },
  {
    id: 'doc-2',
    patientId: 'pat-1',
    title: 'Consentimiento informado',
    kind: 'Legal',
    updatedAt: '2026-07-02',
  },
  {
    id: 'doc-3',
    patientId: 'pat-2',
    title: 'Test BDI-II (digitalizado)',
    kind: 'Test',
    updatedAt: '2026-08-18',
  },
]

export const SEED_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    patientId: 'pat-1',
    concept: 'Sesión 12 — 50 min',
    amount: 60,
    date: '2026-08-18',
    status: 'pagado',
  },
  {
    id: 'inv-2',
    patientId: 'pat-2',
    concept: 'Sesión 1 — evaluación',
    amount: 75,
    date: '2026-08-20',
    status: 'pendiente',
  },
  {
    id: 'inv-3',
    patientId: 'pat-3',
    concept: 'Sesión 7 — 50 min',
    amount: 60,
    date: '2026-08-21',
    status: 'pendiente',
  },
]

export const SEED_EXERCISES: Exercise[] = [
  {
    id: 'ex-1',
    psychologistId: 'psy-1',
    patientId: 'pat-1',
    title: 'Registro de pensamiento',
    kind: 'texto',
    prompt: 'Describe una situación de esta semana y el pensamiento automático que apareció.',
    createdAt: '2026-08-20',
  },
  {
    id: 'ex-2',
    psychologistId: 'psy-1',
    patientId: 'pat-1',
    title: 'Nivel de ansiedad',
    kind: 'seleccion_multiple',
    prompt: '¿Cómo ha sido tu ansiedad hoy?',
    options: ['Muy baja', 'Baja', 'Media', 'Alta', 'Muy alta'],
    createdAt: '2026-08-21',
  },
  {
    id: 'ex-3',
    psychologistId: 'psy-1',
    patientId: 'pat-2',
    title: 'Check-in diario',
    kind: 'emocion_diaria',
    prompt: 'Elige cómo te sientes ahora mismo.',
    createdAt: '2026-08-22',
  },
]

export const SEED_RESPONSES: ExerciseResponse[] = [
  {
    id: 'res-1',
    exerciseId: 'ex-2',
    patientId: 'pat-1',
    value: 'Media',
    submittedAt: '2026-08-22T09:12:00',
  },
]

export const SEED_MOODS: MoodEntry[] = [
  {
    id: 'mood-1',
    patientId: 'pat-1',
    level: 3,
    note: 'Día irregular, pero pude salir a caminar.',
    createdAt: '2026-08-21T21:00:00',
  },
  {
    id: 'mood-2',
    patientId: 'pat-1',
    level: 4,
    note: 'Mejor después de la sesión.',
    createdAt: '2026-08-22T20:30:00',
  },
]

export const SEED_NOTES: ClinicalNote[] = [
  {
    id: 'note-1',
    patientId: 'pat-1',
    body: 'Trabajamos reestructuración cognitiva. Buena alianza terapéutica.',
    createdAt: '2026-08-18',
  },
]

export const WEEK_ACTIVITY = [4, 6, 5, 8, 7, 3, 2]
export const WEEK_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

export function whatsappUrl(phone: string, text: string) {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}
