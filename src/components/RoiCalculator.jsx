import { useEffect, useState } from 'react'

const defaults = {
  people: 3,
  weeklyHours: 8,
  hourlyCost: 45,
  automationRate: 60,
  monthlyErrors: 4,
  errorCost: 150,
  investment: 25000,
}

const fields = [
  ['people', 'Personas involucradas', 1, 500, 1],
  ['weeklyHours', 'Horas semanales por persona', 0, 168, 0.5],
  ['hourlyCost', 'Costo aproximado por hora (Q)', 0, 10000, 1],
  ['automationRate', 'Porcentaje automatizable', 0, 100, 5],
  ['monthlyErrors', 'Errores mensuales', 0, 10000, 1],
  ['errorCost', 'Costo promedio por error (Q)', 0, 1000000, 1],
  ['investment', 'Inversión inicial estimada (Q)', 0, 10000000, 100],
]

function readInitialValues() {
  if (typeof window === 'undefined') return defaults
  const params = new URLSearchParams(window.location.search)
  return Object.fromEntries(Object.entries(defaults).map(([key, fallback]) => {
    const raw = params.get(key)
    const parsed = raw === null ? Number.NaN : Number(raw)
    return [key, Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback]
  }))
}

const currency = new Intl.NumberFormat('es-GT', { style: 'currency', currency: 'GTQ', maximumFractionDigits: 0 })
const number = new Intl.NumberFormat('es-GT', { maximumFractionDigits: 1 })

function calculate(values, factor = 1) {
  const recoveredHours = values.people * values.weeklyHours * 4.33 * (values.automationRate / 100) * factor
  const laborSavings = recoveredHours * values.hourlyCost
  const errorSavings = values.monthlyErrors * values.errorCost * Math.min(factor, 1)
  const monthlySavings = laborSavings + errorSavings
  return {
    recoveredHours,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    payback: monthlySavings > 0 ? values.investment / monthlySavings : 0,
  }
}

export default function RoiCalculator() {
  const [values, setValues] = useState(readInitialValues)
  const [calculated, setCalculated] = useState(false)
  const scenarios = {
    Conservador: calculate(values, 0.7),
    Probable: calculate(values, 1),
    Optimista: calculate(values, 1.15),
  }

  useEffect(() => {
    window.trackWavDevEvent?.('calculator_start', { calculator_name: 'roi_automation' })
  }, [])

  const update = (event) => {
    const value = Math.max(0, Number(event.target.value) || 0)
    setValues((current) => ({ ...current, [event.target.name]: value }))
  }

  const showResults = (event) => {
    event.preventDefault()
    const params = new URLSearchParams(Object.entries(values).map(([key, value]) => [key, String(value)]))
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
    setCalculated(true)
    window.trackWavDevEvent?.('calculator_result', {
      calculator_name: 'roi_automation',
      annual_savings: Math.round(scenarios.Probable.annualSavings),
      payback_months: Number(scenarios.Probable.payback.toFixed(1)),
    })
  }

  const copyLink = async () => {
    await navigator.clipboard?.writeText(window.location.href)
    window.trackWavDevEvent?.('calculator_share', { calculator_name: 'roi_automation' })
  }

  return (
    <div className="roi-calculator">
      <form className="roi-form" onSubmit={showResults}>
        <div className="form-grid">
          {fields.map(([key, label, min, max, step]) => (
            <div className="field" key={key}>
              <label htmlFor={`roi-${key}`}>{label}</label>
              <input id={`roi-${key}`} name={key} type="number" min={min} max={max} step={step} value={values[key]} onChange={update} required />
            </div>
          ))}
        </div>
        <button className="button button-primary" type="submit">Calcular retorno estimado</button>
      </form>

      <section className="roi-results" aria-live="polite">
        <div className="roi-result-heading">
          <div>
            <span className="eyebrow">Resultado estimado</span>
            <h2>{calculated ? 'Tres escenarios para comparar' : 'Ajusta los datos y calcula'}</h2>
          </div>
          {calculated && <button className="button button-secondary" type="button" onClick={copyLink}>Copiar enlace</button>}
        </div>
        <div className="grid grid-3">
          {Object.entries(scenarios).map(([name, result]) => (
            <article className={`roi-scenario ${name === 'Probable' ? 'is-primary' : ''}`} key={name}>
              <span>{name}</span>
              <strong>{currency.format(result.annualSavings)}</strong>
              <p>Ahorro anual estimado</p>
              <dl>
                <div><dt>Horas recuperables/mes</dt><dd>{number.format(result.recoveredHours)}</dd></div>
                <div><dt>Ahorro mensual</dt><dd>{currency.format(result.monthlySavings)}</dd></div>
                <div><dt>Recuperación</dt><dd>{result.payback > 0 ? `${number.format(result.payback)} meses` : 'Sin ahorro calculado'}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <p className="price-note">Estimación informativa. No representa ahorro garantizado ni una cotización. Valida tiempos, salarios, errores, adopción y costos con datos reales antes de invertir.</p>
        <a className="button button-primary" href="/contacto/?servicio=Automatización%20de%20procesos" data-cta="quote" data-service="Calculadora ROI">Solicitar evaluación del proceso</a>
      </section>
    </div>
  )
}
