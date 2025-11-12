import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DealCard from './components/DealCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [deals, setDeals] = useState([])
  const [market, setMarket] = useState('')

  const fetchDeals = async (query = '') => {
    setLoading(true)
    try {
      const url = new URL(`${API_BASE}/api/properties`)
      if (query) {
        const [city, state] = query.split(',').map((s) => s?.trim())
        if (city) url.searchParams.set('city', city)
        if (state) url.searchParams.set('state', state)
      }
      const res = await fetch(url.toString())
      const data = await res.json()
      setDeals(Array.isArray(data) ? data : [])
    } catch (e) {
      setDeals([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeals()
  }, [])

  return (
    <div className="min-h-screen bg-white selection:bg-red-200/60 selection:text-gray-900">
      <Navbar />
      <main>
        <Hero onSearch={(q) => { setMarket(q); fetchDeals(q) }} />

        {/* Deals rail */}
        <section className="relative z-10 -mt-28 pb-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-xs uppercase tracking-widest text-red-500/80 font-semibold">Live Deals</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{market ? `Deals in ${market}` : 'Featured Deals'}</h2>
              </div>
              <button className="group inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
                Set up alerts
                <span className="translate-x-0 group-hover:translate-x-0.5 transition">→</span>
              </button>
            </div>

            {loading ? (
              <div className="grid place-items-center py-16 text-gray-500">Loading deals…</div>
            ) : deals.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {deals.map((d, i) => (
                  <DealCard key={i} deal={d} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed p-10 text-center text-gray-600 bg-white">
                <p>No deals found yet. Try another market or add a property.</p>
                <button
                  onClick={() => fetchDeals('')}
                  className="mt-4 inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-black"
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Features with wow effect */}
        <section id="features" className="relative py-24">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-rose-50/60 to-white" />
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                  Powerful analytics, beautiful by default
                </h2>
                <p className="mt-3 text-gray-700">
                  Underwrite in seconds with cap rate, DSCR, and CoC engines. Save markets and get alerted instantly when new deals hit.
                </p>
                <ul className="mt-6 space-y-3 text-gray-800">
                  {[
                    'Nationwide inventory with consistent data',
                    'Market heatmaps and comp layers',
                    'Saved searches with instant email alerts',
                    'Exportable pro formas and sharing links',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-red-500" />{t}</li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-red-200 via-white to-red-100 blur-2xl opacity-70" />
                <div className="rounded-3xl border bg-white p-4 shadow-xl">
                  <div className="grid grid-cols-3 gap-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="aspect-square rounded-2xl bg-gradient-to-br from-gray-50 to-white border" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Get early access</h2>
            <p className="mt-2 text-gray-600">Tell us about your investing focus and we’ll reach out.</p>
            <LeadForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function LeadForm() {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (e) {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 grid gap-3 text-left">
      <input
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Your name"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <input
        required
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <textarea
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="What markets or asset classes are you after?"
        className="w-full min-h-[100px] rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <button
        disabled={status==='loading'}
        className="mt-2 inline-flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending…' : status === 'success' ? 'Thanks! We\'ll be in touch.' : 'Request access'}
      </button>
      {status === 'error' && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
    </form>
  )
}

function Footer() {
  return (
    <footer className="border-t bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Proplift. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-900">Privacy</a>
          <a href="#" className="hover:text-gray-900">Terms</a>
          <a href="/test" className="hover:text-gray-900">Status</a>
        </div>
      </div>
    </footer>
  )
}
