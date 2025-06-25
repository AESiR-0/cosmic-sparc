'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { userDb } from '@/lib/db'

export default function DebugPage() {
  const [authUser, setAuthUser] = useState<any>(null)
  const [dbUser, setDbUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // Check Supabase Auth
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      setAuthUser(user)
      
      if (authError) {
        setError(`Auth Error: ${authError.message}`)
        return
      }

      if (user) {
        // Check Database User
        const { data: userData, error: userError } = await userDb.getCurrentUser()
        setDbUser(userData)
        
        if (userError) {
          setError(`Database Error: ${userError}`)
        }
      }
    } catch (err) {
      setError(`Unexpected Error: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const createUserInDb = async () => {
    if (!authUser) return
    
    try {
      const { error } = await userDb.createUser(authUser.id, authUser.email || '', 'admin')
      if (error) {
        setError(`Failed to create user: ${error}`)
      } else {
        await checkAuth() // Refresh the data
      }
    } catch (err) {
      setError(`Error creating user: ${err}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006D92] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading debug info...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Debug</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-red-900">Error:</h3>
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Supabase Auth User */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Supabase Auth User</h2>
            {authUser ? (
              <div className="space-y-2">
                <p><strong>ID:</strong> {authUser.id}</p>
                <p><strong>Email:</strong> {authUser.email}</p>
                <p><strong>Email Confirmed:</strong> {authUser.email_confirmed_at ? 'Yes' : 'No'}</p>
                <p><strong>Created:</strong> {new Date(authUser.created_at).toLocaleString()}</p>
                <p><strong>Last Sign In:</strong> {authUser.last_sign_in_at ? new Date(authUser.last_sign_in_at).toLocaleString() : 'Never'}</p>
              </div>
            ) : (
              <p className="text-gray-600">No authenticated user found</p>
            )}
          </div>

          {/* Database User */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Database User</h2>
            {dbUser ? (
              <div className="space-y-2">
                <p><strong>ID:</strong> {dbUser.id}</p>
                <p><strong>Email:</strong> {dbUser.email}</p>
                <p><strong>Role:</strong> {dbUser.role}</p>
                <p><strong>Created:</strong> {new Date(dbUser.created_at).toLocaleString()}</p>
                <p><strong>Updated:</strong> {new Date(dbUser.updated_at).toLocaleString()}</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">No user found in database</p>
                {authUser && (
                  <Button onClick={createUserInDb} className="bg-[#006D92] hover:bg-[#e28618]">
                    Create User in Database
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="flex gap-4">
            <Button onClick={checkAuth} variant="outline">
              Refresh Debug Info
            </Button>
            <Button 
              onClick={() => supabase.auth.signOut()} 
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Navigation</h2>
          <div className="flex gap-4">
            <a href="/" className="text-[#006D92] hover:text-[#e28618]">Home</a>
            <a href="/login" className="text-[#006D92] hover:text-[#e28618]">Login</a>
            <a href="/dashboard" className="text-[#006D92] hover:text-[#e28618]">Dashboard</a>
            <a href="/setup" className="text-[#006D92] hover:text-[#e28618]">Setup</a>
          </div>
        </div>
      </div>
    </div>
  )
} 