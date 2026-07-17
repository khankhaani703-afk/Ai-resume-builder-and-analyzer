'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { resumeAPI, analysisAPI } from '@/lib/api'
import { useAuthStore } from '@/lib/store/authStore'
import Navbar from '@/components/Navbar'
import toast from 'react-hot-toast'
import { Upload, Trash2, Sparkles } from 'lucide-react'

interface Resume {
  _id: string
  title: string
  fileName: string
  fileType: string
  createdAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, token } = useAuthStore()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!token) {
      router.push('/login')
      return
    }
    fetchResumes()
  }, [token, router])

  const fetchResumes = async () => {
    try {
      setLoading(true)
      const response = await resumeAPI.getAll()
      setResumes(response.data.resumes)
    } catch (error: any) {
      toast.error('Failed to fetch resumes')
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('resume', file)
      formData.append('title', file.name)

      await resumeAPI.upload(formData)
      toast.success('Resume uploaded successfully!')
      fetchResumes()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return

    try {
      await resumeAPI.delete(id)
      toast.success('Resume deleted')
      fetchResumes()
    } catch (error) {
      toast.error('Failed to delete resume')
    }
  }

  const handleAnalyze = async (resumeId: string) => {
    router.push(`/analyze/${resumeId}`)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Resumes</h1>
            <p className="text-gray-600">Upload and manage your resumes</p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg p-8 cursor-pointer hover:border-blue-500 transition">
              <Upload size={40} className="text-blue-600 mb-2" />
              <span className="text-lg font-medium text-gray-700">Upload Resume</span>
              <span className="text-sm text-gray-500">PDF or DOCX (Max 10MB)</span>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {/* Resumes Grid */}
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : resumes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No resumes yet. Upload your first resume!</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <div key={resume._id} className="card hover:shadow-lg transition">
                  <h3 className="text-lg font-semibold mb-2">{resume.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{resume.fileType.toUpperCase()}</p>
                  <p className="text-xs text-gray-500 mb-4">
                    {new Date(resume.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAnalyze(resume._id)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      <Sparkles size={18} />
                      <span>Analyze</span>
                    </button>
                    <button
                      onClick={() => handleDelete(resume._id)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
