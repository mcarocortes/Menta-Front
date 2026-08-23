import { useAuth } from '../../auth/AuthContext'

export function PerfilPage() {
  const { user, users } = useAuth()
  const psychologist = users.find((item) => item.id === user?.psychologistId)

  return (
    <>
      <h1 className="page-title">Mi perfil</h1>
      <p className="lede">Datos de tu ficha. Más adelante se rellenarán desde el backend.</p>
      <section className="card">
        <h3>{user?.name}</h3>
        <p>{user?.email}</p>
        <p className="muted">Psicóloga asignada: {psychologist?.name ?? '—'}</p>
      </section>
    </>
  )
}
