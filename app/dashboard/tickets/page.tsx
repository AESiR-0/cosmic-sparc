'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Button } from '@/components/ui/button'
import { Ticket, Plus, Download, Filter } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    setLoading(true)
    setError('')
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*, event:events(name, image_url, date, venue)')
        .order('created_at', { ascending: false })
      if (error) throw error
      setTickets(data || [])
    } catch (err) {
      setError('Failed to load tickets.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout title="Tickets">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
            <p className="text-gray-600">Manage event tickets and registrations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <Ticket className="w-8 h-8 text-cosmic-blue" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sold</p>
                <p className="text-2xl font-bold text-green-600">0</p>
              </div>
              <Ticket className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-cosmic-orange">₹0</p>
              </div>
              <Ticket className="w-8 h-8 text-cosmic-orange" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Events</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <Ticket className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading tickets...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : tickets.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No tickets found.</div>
        ) : (
          <div className="space-y-4">
            {tickets.map(ticket => (
              <div key={ticket.id} className="bg-white rounded-lg border p-4 flex items-center gap-4">
                {ticket.event?.image_url && (
                  <img src={ticket.event.image_url} alt={ticket.event.name} className="w-20 h-20 object-cover rounded-md" />
                )}
                <div className="flex-1">
                  <div className="font-semibold">{ticket.event?.name || ticket.name}</div>
                  <div className="text-xs text-gray-500">{ticket.email}</div>
                  <div className="text-xs text-gray-500">Ticket ID: {ticket.ticket_id}</div>
                  <div className="text-xs text-gray-500">{ticket.event?.venue}</div>
                  <div className="text-xs text-gray-500">{ticket.event?.date}</div>
                </div>
                <div className="text-xs text-gray-600">{ticket.status}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
} 