'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { analysisAPI, resumeAPI } from '@/lib/api'
import { useAuthStore } from '@/lib/store/authStore'
import Navbar from '@/components/Navbar'
import toast from 'react-hot-toast'
import { ArrowLeft, Zap } from 'lucide-react'

export default function AnalyzePage() {
  const params = useParams()
  const router = useRouter()
  const { token } = useAuthStore()
  const resumeId = params.id as string

  const [analysis, setAnalysis] = useState<any>(null)
  const [atsScore, setAtsScore] = useState<number | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [calculating, setCalculating] = useState(false)

  useEffect(() => {
    if (!token) {
      router.push('/login')
      return
    }
    handleAnalyze()
  }, [token, router])

  const handleAnalyze = async () => {
    try {
      setLoading(true)
      const response = await analysisAPI.analyze(resumeId)
      setAnalysis(response.data.analysis)
      toast.success('Resume analyzed!')
    } catch (error: any) {
      toast.error('Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  const handleATSCalculation = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description')
      return
    }

    try {
      setCalculating(true)
      const response = await analysisAPI.getATSScore(resumeId, jobDescription)
      setAtsScore(response.data.atsScore)
      toast.success('ATS score calculated!')
    } catch (error: any) {
      toast.error('ATS calculation failed')
    } finally {
      setCalculating(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <h1 className="text-3xl font-bold mb-2">Resume Analysis</h1>
          <p className="text-gray-600 mb-8">AI-powered insights for your resume</p>

          {loading ? (
            <div className="text-center py-12">Analyzing your resume...</div>
          ) : analysis ? (
            <div className="space-y-6">
              {/* Overall Feedback */}
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Overall Feedback</h2>
                <p className="text-gray-700">{analysis.overallFeedback}</p>
              </div>

              {/* Strengths */}
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">✅ Strengths</h2>
                <ul className="space-y-2">
                  {analysis.strengths?.map((strength: string, i: number) => (
                    <li key={i} className="flex items-start space-x-3">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">⚠️ Areas for Improvement</h2>
                <ul className="space-y-2">
                  {analysis.weaknesses?.map((weakness: string, i: number) => (
                    <li key={i} className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold mt-1">•</span>
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">💡 Suggestions</h2>
                <ul className="space-y-2">
                  {analysis.suggestions?.map((suggestion: string, i: number) => (
                    <li key={i} className="flex items-start space-x-3">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ATS Score Checker */}
              <div className="card">
                <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Zap size={24} className="text-yellow-500" />
                  <span>ATS Compatibility Score</span>
                </h2>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste job description here..."
                  className="w-full h-40 p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleATSCalculation}
                  disabled={calculating}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {calculating ? 'Calculating...' : 'Calculate ATS Score'}
                </button>

                {atsScore !== null && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-center text-gray-700 mb-2">Your ATS Score</p>
                    <div className="text-4xl font-bold text-center text-blue-600">{atsScore}%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${atsScore}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
