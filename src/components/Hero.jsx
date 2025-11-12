import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero({ onSearch }) {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center rounded-full bg-white/70 backdrop-blur px-3 py-1 text-sm text-gray-700">Invest across the USA</span>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Find better real estate deals, faster
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            A modern deal-finding platform with analytics, alerts, and nationwide coverage.
          </p>

          <div className="mt-6 bg-white/80 backdrop-blur rounded-xl p-2 shadow-lg">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search city or state (e.g. Austin, TX)"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-400 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && onSearch) onSearch(e.target.value)
                }}
              />
              <button
                onClick={() => {
                  const el = document.querySelector('input')
                  if (onSearch && el) onSearch(el.value)
                }}
                className="px-5 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Search Deals
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2">Try markets like Phoenix, AZ • Tampa, FL • Raleigh, NC</p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white" />
    </section>
  )
}
