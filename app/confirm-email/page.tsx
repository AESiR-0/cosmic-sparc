'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ConfirmEmailPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    handleEmailConfirmation()
  }, [])

  const handleEmailConfirmation = async () => {
    try {
      // Get the token from URL parameters
      const token = searchParams.get('token')
      const type = searchParams.get('type')

      if (token && type === 'signup') {
        // Confirm the email
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup'
        })

        if (error) {
          setError('Email confirmation failed. Please try again.')
        } else {
          setSuccess(true)
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/login')
          }, 3000)
        }
      } else {
        setError('Invalid confirmation link.')
      }
    } catch (err) {
      setError('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006D92] mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirming Email</h1>
            <p className="text-gray-600">Please wait while we confirm your email address...</p>
          </div>
        </div>
      </main>
    )
  }

  if (success) {
    return (
      <main className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Your email has been successfully confirmed. You'll be redirected to the login page shortly.
            </p>
            <Link href="/login">
              <Button className="bg-[#006D92] hover:bg-[#e28618]">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirmation Failed</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Link href="/login">
              <Button className="w-full bg-[#006D92] hover:bg-[#e28618]">
                Go to Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="w-full">
                Try Signing Up Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 