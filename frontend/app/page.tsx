'use client'

import Link from 'next/link'
import { useAuthStore } from '@/lib/store/authStore'
import Navbar from '@/components/Navbar'
import { ArrowRight, Zap, Sparkles, BarChart3 } from 'lucide-react'

export default function HomePage() {
  const { user } = useAuthStore()

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Resume Builder & Analyzer
            </h1>
            <p className="text-xl text-gray-600">
              Powered by Google Gemini AI, our intelligent resume builder helps you create, optimize, and analyze your resume for maximum impact.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              {user ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight size={20} />
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
                  >
                    <span>Get Started</span>
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <Sparkles className="text-blue-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">Get intelligent feedback on your resume from Google Gemini AI.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <BarChart3 className="text-purple-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">ATS Score</h3>
              <p className="text-gray-600">Check how well your resume matches job descriptions with ATS scoring.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <Zap className="text-pink-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">Instant Optimization</h3>
              <p className="text-gray-600">Get actionable suggestions to improve your resume immediately.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
