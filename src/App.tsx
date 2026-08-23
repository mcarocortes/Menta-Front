import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { AppShell } from './components/AppShell'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardPage } from './pages/psicologa/DashboardPage'
import { PacientesPage } from './pages/psicologa/PacientesPage'
import { FichaPacientePage } from './pages/psicologa/FichaPacientePage'
import { AgendaPage } from './pages/psicologa/AgendaPage'
import { DocumentosPage } from './pages/psicologa/DocumentosPage'
import { FacturacionPage } from './pages/psicologa/FacturacionPage'
import { EjerciciosPage } from './pages/psicologa/EjerciciosPage'
import { DiarioPage } from './pages/paciente/DiarioPage'
import { EjerciciosPacientePage } from './pages/paciente/EjerciciosPacientePage'
import { AgendaPacientePage } from './pages/paciente/AgendaPacientePage'
import { PerfilPage } from './pages/paciente/PerfilPage'

function PsyLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute role="psicologa">
      <AppShell>{children}</AppShell>
    </ProtectedRoute>
  )
}

function PatientLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute role="paciente">
      <AppShell>{children}</AppShell>
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />

      <Route
        path="/psicologa"
        element={
          <PsyLayout>
            <DashboardPage />
          </PsyLayout>
        }
      />
      <Route
        path="/psicologa/pacientes"
        element={
          <PsyLayout>
            <PacientesPage />
          </PsyLayout>
        }
      />
      <Route
        path="/psicologa/pacientes/:id"
        element={
          <PsyLayout>
            <FichaPacientePage />
          </PsyLayout>
        }
      />
      <Route
        path="/psicologa/agenda"
        element={
          <PsyLayout>
            <AgendaPage />
          </PsyLayout>
        }
      />
      <Route
        path="/psicologa/documentos"
        element={
          <PsyLayout>
            <DocumentosPage />
          </PsyLayout>
        }
      />
      <Route
        path="/psicologa/facturacion"
        element={
          <PsyLayout>
            <FacturacionPage />
          </PsyLayout>
        }
      />
      <Route
        path="/psicologa/ejercicios"
        element={
          <PsyLayout>
            <EjerciciosPage />
          </PsyLayout>
        }
      />

      <Route
        path="/app"
        element={
          <PatientLayout>
            <DiarioPage />
          </PatientLayout>
        }
      />
      <Route
        path="/app/ejercicios"
        element={
          <PatientLayout>
            <EjerciciosPacientePage />
          </PatientLayout>
        }
      />
      <Route
        path="/app/agenda"
        element={
          <PatientLayout>
            <AgendaPacientePage />
          </PatientLayout>
        }
      />
      <Route
        path="/app/perfil"
        element={
          <PatientLayout>
            <PerfilPage />
          </PatientLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
