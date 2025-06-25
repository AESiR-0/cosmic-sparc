'use client'

import React from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Button } from '@/components/ui/button'
import { Users, Plus, Search, Filter, UserPlus } from 'lucide-react'

export default function UsersPage() {
  return (
    <AdminLayout title="Users">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600">Manage user accounts and permissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button className="bg-cosmic-blue hover:bg-cosmic-blue/90 flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cosmic-blue focus:border-transparent"
            />
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User Management</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Manage user accounts, assign roles, and control access to your event platform. 
            This feature is coming soon!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-cosmic-blue hover:bg-cosmic-blue/90">
              <Plus className="w-4 h-4 mr-2" />
              Invite Users
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
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
              <Users className="w-8 h-8 text-cosmic-blue" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-purple-600">1</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ticketeers</p>
                <p className="text-2xl font-bold text-cosmic-orange">0</p>
              </div>
              <Users className="w-8 h-8 text-cosmic-orange" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Public</p>
                <p className="text-2xl font-bold text-green-600">0</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 