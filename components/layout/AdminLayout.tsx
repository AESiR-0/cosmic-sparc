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
  Bell
} from 'lucide-react'
import { userDb } from '@/lib/db'
import { User } from '@/lib/types'
import { supabase } from '@/lib/supabase'

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title = 'Dashboard' }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
    await supabase.auth.signOut()
    router.push('/')
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Events', href: '/dashboard/events', icon: Calendar },
    { name: 'Create Event', href: '/dashboard/events/create', icon: Plus },
    { name: 'Tickets', href: '/dashboard/tickets', icon: Ticket },
    { name: 'Users', href: '/dashboard/users', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#006D92] to-[#e28618] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CS</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Cosmic Sparc</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive ? 'bg-[#006D92] text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'}`} />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-[#006D92] to-[#e28618] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user.role === 'admin' ? 'Admin' : user.role === 'ticketeer' ? 'Event Creator' : 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="text-gray-400 hover:text-gray-600"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
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