'use client'

import React from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Button } from '@/components/ui/button'
import { Ticket, Plus, Download, Filter } from 'lucide-react'

export default function TicketsPage() {
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

        {/* Coming Soon */}
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tickets Management</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Track ticket sales, manage registrations, and handle check-ins for your events. 
            This feature is coming soon!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-cosmic-blue hover:bg-cosmic-blue/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket Type
            </Button>
            <Button variant="outline">
              View Documentation
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
      </div>
    </AdminLayout>
  )
} 