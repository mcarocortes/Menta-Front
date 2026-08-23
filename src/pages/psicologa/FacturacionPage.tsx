import { useAuth } from '../../auth/AuthContext'
import { useClinic } from '../../data/ClinicContext'

export function FacturacionPage() {
  const { users } = useAuth()
  const { invoices, setInvoiceStatus } = useClinic()

  return (
    <>
      <h1 className="page-title">Facturación</h1>
      <p className="lede">
        Sin pasarela de pago todavía: solo marcas si la sesión está pagada o pendiente.
      </p>
      <div className="list">
        {invoices.map((inv) => {
          const patient = users.find((u) => u.id === inv.patientId)
          return (
            <article key={inv.id} className="card">
              <div className="list-item" style={{ background: 'transparent', padding: 0 }}>
                <div>
                  <strong>{inv.concept}</strong>
                  <div className="muted">
                    {patient?.name} · {inv.date} · {inv.amount} €
                  </div>
                </div>
                <span className={`chip ${inv.status === 'pagado' ? 'chip-ok' : 'chip-warn'}`}>
                  {inv.status}
                </span>
              </div>
              <div className="row-actions">
                <button className="btn btn-primary" style={{ width: 'auto' }} onClick={() => setInvoiceStatus(inv.id, 'pagado')}>
                  Marcar pagado
                </button>
                <button className="btn btn-secondary" onClick={() => setInvoiceStatus(inv.id, 'pendiente')}>
                  Marcar pendiente
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}
