'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Plus,
  ArrowRight,
  BarChart3,
  Ticket
} from 'lucide-react'
import { eventDb } from '@/lib/db'
import { Event } from '@/lib/types'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const { data, error } = await eventDb.getAllEvents()
      if (!error && data) {
        setEvents(data)
      }
    } catch (err) {
      console.error('Failed to fetch events:', err)
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    totalEvents: events.length,
    publishedEvents: events.filter(e => e.status === 'published').length,
    draftEvents: events.filter(e => e.status === 'draft').length,
    cancelledEvents: events.filter(e => e.status === 'cancelled').length
  }

  const recentEvents = events.slice(0, 5)

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#006D92] to-[#e28618] rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome to Cosmic Sparc</h1>
          <p className="opacity-90">Manage your events, track registrations, and grow your community</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => router.push('/dashboard/events/create')}
            className="h-24 flex flex-col items-center justify-center gap-2 bg-white border-2 border-dashed border-gray-300 hover:border-[#006D92] hover:bg-[#006D92]/5"
          >
            <Plus className="w-8 h-8 text-[#006D92]" />
            <span className="font-medium">Create Event</span>
          </Button>
          
          <Button
            onClick={() => router.push('/dashboard/events')}
            className="h-24 flex flex-col items-center justify-center gap-2 bg-white border-2 border-dashed border-gray-300 hover:border-[#006D92] hover:bg-[#006D92]/5"
          >
            <Calendar className="w-8 h-8 text-[#006D92]" />
            <span className="font-medium">Manage Events</span>
          </Button>
          
          <Button
            onClick={() => router.push('/dashboard/tickets')}
            className="h-24 flex flex-col items-center justify-center gap-2 bg-white border-2 border-dashed border-gray-300 hover:border-[#006D92] hover:bg-[#006D92]/5"
          >
            <Ticket className="w-8 h-8 text-[#006D92]" />
            <span className="font-medium">View Tickets</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEvents}</p>
              </div>
              <Calendar className="w-8 h-8 text-[#006D92]" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">{stats.publishedEvents}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.draftEvents}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{stats.cancelledEvents}</p>
              </div>
              <Users className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Events</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/dashboard/events')}
              className="flex items-center gap-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006D92] mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading events...</p>
            </div>
          ) : recentEvents.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No events created yet</p>
              <Button
                onClick={() => router.push('/dashboard/events/create')}
                className="bg-[#006D92] hover:bg-[#006D92]/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Event
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentEvents.map(event => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{event.name}</h3>
                    <p className="text-sm text-gray-600">{event.venue}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'published' ? 'bg-green-100 text-green-800' :
                      event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {event.status}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/dashboard/events/${event.id}/edit`)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
} 