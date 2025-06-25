'use client'

import React from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Button } from '@/components/ui/button'
import { Settings, Save, Globe, Shield, Bell, Palette } from 'lucide-react'

export default function SettingsPage() {
  return (
    <AdminLayout title="Settings">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Configure your platform preferences and account settings</p>
          </div>
          <Button className="bg-cosmic-blue hover:bg-cosmic-blue/90 flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings Management</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Configure platform settings, manage user preferences, and customize your experience. 
            This feature is coming soon!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-cosmic-blue hover:bg-cosmic-blue/90">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
            <Button variant="outline">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 