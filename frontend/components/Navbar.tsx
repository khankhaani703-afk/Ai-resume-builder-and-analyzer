'use client'

import Link from 'next/link'
import { useAuthStore } from '@/lib/store/authStore'
import { LogOut, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">📄 ResumeAI</div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <span className="text-gray-700">Welcome, {user.firstName}!</span>
                <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu size={24} />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {user ? (
              <>
                <Link href="/dashboard" className="block py-2 text-blue-600 hover:text-blue-800">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left py-2 text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2 text-blue-600 hover:text-blue-800">
                  Login
                </Link>
                <Link href="/register" className="block py-2 text-blue-600 hover:text-blue-800">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
