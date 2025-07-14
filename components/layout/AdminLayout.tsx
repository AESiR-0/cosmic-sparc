'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Plus,
  BarChart3,
  Ticket,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { userDb } from '@/lib/db'
import { User } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import DashboardSidebar from './DashboardSidebar';

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title = 'Dashboard' }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname();

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (!authUser) {
        router.push('/login')
        return
      }

      const { data: userData, error: userError } = await userDb.getCurrentUser()
      
      if (userError || !userData) {
        // If user doesn't exist in users table, create them
        const { error: createError } = await userDb.createUser(authUser.id, authUser.email || '', 'admin')
        if (createError) {
          console.error('Failed to create user:', createError)
          router.push('/login')
          return
        }
        // Retry getting user data
        const { data: retryUserData } = await userDb.getCurrentUser()
        if (retryUserData) {
          setUser(retryUserData)
        } else {
          router.push('/login')
          return
        }
      } else {
        setUser(userData)
      }

      // Allow admin and ticketeer roles to access dashboard
      // Check the actual user data that was set
      const finalUserData = userData || (await userDb.getCurrentUser()).data
      if (finalUserData && !['admin', 'ticketeer'].includes(finalUserData.role)) {
        router.push('/')
        return
      }

    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    // Instead of direct sign out, redirect to /logout page
    router.push('/logout');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006D92] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Main content, with left margin for sidebar */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              {/* Hamburger always visible when sidebar is collapsed */}
              {!sidebarOpen && (
                <button
                  className="p-2 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Expand sidebar"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5 text-[#006D92]" />
                </button>
              )}
              <h1 className="text-xl font-semibold text-gray-900 ml-4 lg:ml-0">
                {title}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-gray-600">Welcome back,</span>
                <span className="text-sm font-medium text-gray-900">
                  {user.email.split('@')[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout 