import React from 'react'
import { Menu, Search } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-4 flex h-14 items-center justify-between rounded-full border border-white/30 bg-white/60 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-3 pl-4">
            <button className="p-2 rounded-full hover:bg-white/70 transition">
              <Menu className="h-5 w-5 text-gray-700" />
            </button>
            <a href="/" className="text-gray-900 font-semibold tracking-tight">Proplift</a>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <a href="#features" className="hover:text-gray-900">Features</a>
            <a href="#markets" className="hover:text-gray-900">Markets</a>
            <a href="#pricing" className="hover:text-gray-900">Pricing</a>
            <a href="#contact" className="hover:text-gray-900">Contact</a>
          </nav>
          <div className="flex items-center gap-2 pr-2">
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm rounded-full bg-white/80 border border-gray-200">
              <Search className="h-4 w-4 text-gray-600" />
              <span className="text-gray-700">Search</span>
            </button>
            <a href="#pricing" className="px-4 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow hover:opacity-95">Get started</a>
          </div>
        </div>
      </div>
    </header>
  )
}
