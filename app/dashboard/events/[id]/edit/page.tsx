'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminLayout from '@/components/layout/AdminLayout'
import FormRenderer from '@/components/forms/FormRenderer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'
import { eventDb } from '@/lib/db'
import { Event } from '@/lib/types'
import AssignTicketeers from '@/components/AssignTicketeers'

export default function EditEventPage() {
  const [loading, setLoading] = useState(false)
  const [event, setEvent] = useState<Event | null>(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  // State for custom registration fields
  const [formSchema, setFormSchema] = useState<any[]>(event?.form_schema || []);
  const [newField, setNewField] = useState({ name: '', label: '', type: 'text', required: false });

  useEffect(() => {
    fetchEvent()
  }, [eventId])

  useEffect(() => {
    if (event?.form_schema) setFormSchema(event.form_schema);
  }, [event]);

  const fetchEvent = async () => {
    try {
      const { data, error } = await eventDb.getEventById(eventId, true)
      
      if (error) {
        alert('Failed to fetch event: ' + error)
        router.push('/dashboard/events')
        return
      }

      setEvent(data)
    } catch (err) {
      console.error('Error fetching event:', err)
      alert('Failed to fetch event')
      router.push('/dashboard/events')
    } finally {
      setInitialLoading(false)
    }
  }

  const formFields = [
    {
      name: 'name',
      label: 'Event Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter event name (e.g., Rajkot Expo 2025)',
      validation: {
        minLength: 3,
        maxLength: 100
      }
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: false,
      placeholder: 'Describe your event...',
      validation: {
        maxLength: 500
      }
    },
    {
      name: 'date',
      label: 'Event Date',
      type: 'date' as const,
      required: true
    },
    {
      name: 'venue',
      label: 'Venue',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter venue name and address'
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    }
  ]

  const handleSubmit = async (formData: Record<string, any>) => {
    try {
      setLoading(true)

      const { data, error } = await eventDb.updateEvent(eventId, {
        name: formData.name,
        description: formData.description || null,
        date: formData.date,
        venue: formData.venue,
        status: formData.status,
        form_schema: formSchema // <-- Save custom registration schema
      })

      if (error) {
        alert('Failed to update event: ' + error)
        return
      }

      // Redirect to events list
      router.push('/dashboard/events')
    } catch (err) {
      console.error('Error updating event:', err)
      alert('Failed to update event. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddField = () => {
    if (!newField.name || !newField.label) return;
    setFormSchema([...formSchema, newField]);
    setNewField({ name: '', label: '', type: 'text', required: false });
  };

  const handleRemoveField = (idx: number) => {
    setFormSchema(formSchema.filter((_, i) => i !== idx));
  };

  const handleFieldChange = (name: string, value: any) => {
    setNewField(prev => ({ ...prev, [name]: value }));
  };

  const handleFieldChangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setNewField(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  if (initialLoading) {
    return (
      <AdminLayout title="Edit Event">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cosmic-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading event...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!event) {
    return (
      <AdminLayout title="Edit Event">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/dashboard/events')}>
            Back to Events
          </Button>
        </div>
      </AdminLayout>
    )
  }

  const initialData = {
    name: event.name,
    description: event.description || '',
    date: event.date.split('T')[0], // Format date for input
    venue: event.venue,
    status: event.status
  }

  return (
    <AdminLayout title="Edit Event">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Event</h1>
            <p className="text-gray-600">Update your event details and settings</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <FormRenderer
            fields={formFields}
            onSubmit={handleSubmit}
            submitText="Update Event"
            loading={loading}
            initialData={initialData}
          />
        </div>

        {/* Custom Registration Fields */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">Custom Registration Fields</h2>
          <div className="flex gap-2 mb-4">
            <input
              name="name"
              value={newField.name}
              onChange={handleFieldChangeEvent}
              placeholder="Field Name (e.g. company)"
              className="border rounded px-2 py-1 w-32"
            />
            <input
              name="label"
              value={newField.label}
              onChange={handleFieldChangeEvent}
              placeholder="Label (e.g. Company Name)"
              className="border rounded px-2 py-1 w-40"
            />
            <select
              name="type"
              value={newField.type}
              onChange={handleFieldChangeEvent}
              className="border rounded px-2 py-1"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
            </select>
            <label className="flex items-center gap-1">
              <input
                name="required"
                type="checkbox"
                checked={newField.required}
                onChange={handleFieldChangeEvent}
              />
              Required
            </label>
            <button type="button" onClick={handleAddField} className="bg-[#006D92] text-white px-3 py-1 rounded flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          {formSchema.length > 0 && (
            <div className="space-y-2">
              {formSchema.map((field, idx) => (
                <div key={idx} className="flex items-center gap-2 border-b pb-1">
                  <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{field.name}</span>
                  <span>{field.label}</span>
                  <span className="text-gray-500">({field.type})</span>
                  {field.required && <span className="text-red-500 text-xs ml-1">required</span>}
                  <button type="button" onClick={() => handleRemoveField(idx)} className="ml-auto text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          )}
          {formSchema.length === 0 && <div className="text-gray-500">No custom fields added yet.</div>}
        </div>

        {/* Ticketeer Assignment */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">Assign Ticketeers</h2>
          <AssignTicketeers eventId={event.id} />
        </div>

        {/* Event Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#006D92] mb-2">Event Information:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Event ID: {event.id}</li>
            <li>• Slug: {event.slug}</li>
            <li>• Created: {new Date(event.created_at).toLocaleDateString()}</li>
            <li>• Last Updated: {new Date(event.updated_at).toLocaleDateString()}</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  )
} 