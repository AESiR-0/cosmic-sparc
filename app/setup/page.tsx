'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, AlertCircle, Copy, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { userDb } from '@/lib/db'

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [autoSetupComplete, setAutoSetupComplete] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleAutoSetup = async () => {
    setLoading(true)
    setMessage('')
    setError('')

    try {
      await userDb.setupTestUsers()
      setMessage('Test users created successfully! You can now login with:')
      setAutoSetupComplete(true)
    } catch (err) {
      setError('Failed to create test users automatically. Please use manual setup below.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#006D92] to-[#e28618] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">CS</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Setup Cosmic Sparc</h1>
            <p className="text-gray-600">Create test users to access the platform</p>
          </div>

          <div className="space-y-6">
            {/* Auto Setup Section */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">🚀 Quick Setup (Recommended)</h3>
              <p className="text-sm text-green-800 mb-4">
                Automatically create test users with confirmed emails for development.
              </p>
              <Button
                onClick={handleAutoSetup}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Users...
                  </>
                ) : (
                  'Auto Setup Users'
                )}
              </Button>
            </div>

            {message && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <p className="text-green-800">{message}</p>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="bg-white p-3 rounded border">
                    <strong>Admin User:</strong><br />
                    Email: cyborgkiller1008@gmail.com<br />
                    Password: password123<br />
                    Role: Admin
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <strong>Event Creator:</strong><br />
                    Email: workbyprat@gmail.com<br />
                    Password: password123<br />
                    Role: Ticketeer
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <strong>Regular User:</strong><br />
                    Email: pratiechellani@gmail.com<br />
                    Password: password123<br />
                    Role: Public
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800">{error}</p>
                </div>
              </div>
            )}

            {/* Manual Setup Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">📋 Manual Setup Instructions</h3>
              <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                <li>Go to your Supabase dashboard</li>
                <li>Navigate to Authentication → Users</li>
                <li>Click "Add User" and create the following users:</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Admin User */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">👑 Admin User</h4>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Admin</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <label className="text-gray-600">Email:</label>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs flex-1">cyborgkiller1008@gmail.com</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard('cyborgkiller1008@gmail.com')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-600">Password:</label>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs flex-1">password123</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard('password123')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Creator */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">🎫 Event Creator</h4>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Ticketeer</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <label className="text-gray-600">Email:</label>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs flex-1">workbyprat@gmail.com</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard('workbyprat@gmail.com')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-600">Password:</label>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs flex-1">password123</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard('password123')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regular User */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">👤 Regular User</h4>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Public</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <label className="text-gray-600">Email:</label>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs flex-1">pratiechellani@gmail.com</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard('pratiechellani@gmail.com')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-600">Password:</label>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs flex-1">password123</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard('password123')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Important Notes</h3>
              <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                <li>After creating users in Supabase Auth, you need to manually add them to the <code className="bg-yellow-100 px-1 rounded">users</code> table</li>
                <li>Go to Table Editor → users table and add entries with the same email and appropriate roles</li>
                <li>Roles: <code className="bg-yellow-100 px-1 rounded">admin</code>, <code className="bg-yellow-100 px-1 rounded">ticketeer</code>, <code className="bg-yellow-100 px-1 rounded">public</code></li>
                <li><strong>For development:</strong> Users created via auto-setup will have confirmed emails</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Link href="/login" className="flex-1">
                <Button className="w-full bg-[#006D92] hover:bg-[#e28618]">
                  Go to Login
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 