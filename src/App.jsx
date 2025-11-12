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
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero onSearch={(q) => { setMarket(q); fetchDeals(q) }} />

        <section className="relative z-10 -mt-16 pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{market ? `Deals in ${market}` : 'Featured Deals'}</h2>
              <a href="#" className="text-sm text-red-600 hover:text-red-700">Set up alerts →</a>
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
              <div className="rounded-xl border border-dashed p-10 text-center text-gray-600">
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

        <section id="features" className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Built for modern investors</h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{
                title: 'Nationwide Coverage',
                desc: 'Search deals across every US market with consistent data.'
              },{
                title: 'Smart Analytics',
                desc: 'Cap rates, cash-on-cash, and underwriting helpers built-in.'
              },{
                title: 'Alerts & Saved Searches',
                desc: 'Stay on top of your target markets and be first to act.'
              }].map((f, i) => (
                <div key={i} className="rounded-2xl border bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900">{f.title}</h3>
                  <p className="mt-2 text-gray-600 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
        {status === 'loading' ? 'Sending…' : status === 'success' ? 'Thanks! Well be in touch.' : 'Request access'}
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
