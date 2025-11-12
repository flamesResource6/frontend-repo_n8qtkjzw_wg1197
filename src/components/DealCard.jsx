import React from 'react'

export default function DealCard({ deal }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-100">
        {deal.images?.length ? (
          <img src={deal.images[0]} alt={deal.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full grid place-items-center text-gray-400 text-sm">No image</div>
        )}
      </div>
      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <h3 className="font-semibold text-gray-900 truncate" title={deal.title}>{deal.title}</h3>
          {typeof deal.cap_rate === 'number' && (
            <span className="ml-2 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">{deal.cap_rate.toFixed(1)}% cap</span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-600">{deal.city}, {deal.state}</p>
        <p className="mt-2 text-lg font-bold text-gray-900">${Number(deal.price).toLocaleString()}</p>
      </div>
    </div>
  )
}
