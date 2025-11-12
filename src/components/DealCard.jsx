import React from 'react'
import { motion } from 'framer-motion'

export default function DealCard({ deal }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative rounded-2xl border border-gray-200/70 bg-white p-4 shadow-sm hover:shadow-xl transition overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition" style={{
        background: 'radial-gradient(800px circle at var(--x,50%) var(--y,50%), rgba(244,63,94,0.08), transparent 40%)'
      }} />
      <div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = ((e.clientX - rect.left) / rect.width) * 100
          const y = ((e.clientY - rect.top) / rect.height) * 100
          e.currentTarget.parentElement.style.setProperty('--x', `${x}%`)
          e.currentTarget.parentElement.style.setProperty('--y', `${y}%`)
        }}
      >
        <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-100">
          {deal.images?.length ? (
            <img src={deal.images[0]} alt={deal.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
          ) : (
            <div className="h-full w-full grid place-items-center text-gray-400 text-sm">No image</div>
          )}
        </div>
        <div className="mt-4">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-semibold text-gray-900 truncate" title={deal.title}>{deal.title}</h3>
            {typeof deal.cap_rate === 'number' && (
              <span className="ml-2 rounded-full bg-emerald-50 ring-1 ring-emerald-200 px-2 py-0.5 text-xs font-medium text-emerald-700">{deal.cap_rate.toFixed(1)}% cap</span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-600">{deal.city}, {deal.state}</p>
          <p className="mt-2 text-lg font-bold text-gray-900">${Number(deal.price).toLocaleString()}</p>
        </div>
      </div>
    </motion.div>
  )
}
