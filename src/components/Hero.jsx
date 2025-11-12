import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero({ onSearch }) {
  return (
    <section className="relative h-[82vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center rounded-full bg-white/70 backdrop-blur px-3 py-1 text-sm text-gray-700">Invest across the USA</span>
          <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
            Smarter property picks, nationwide
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Real-time deal discovery with analytics, alerts, and beautiful market insights.
          </p>

          <div className="mt-8 bg-white/85 backdrop-blur-xl rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search city or state (e.g. Austin, TX)"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-400 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && onSearch) onSearch(e.target.value)
                }}
              />
              <button
                onClick={() => {
                  const el = document.querySelector('input')
                  if (onSearch && el) onSearch(el.value)
                }}
                className="px-5 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 hover:opacity-95 transition shadow"
              >
                Search Deals
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2">Try markets like Phoenix, AZ • Tampa, FL • Raleigh, NC</p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white" />
    </section>
  )
}
