'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/layout/AdminLayout'
import FormRenderer from '@/components/forms/FormRenderer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { eventDb, generateSlug } from '@/lib/db'
import { supabase } from '@/lib/supabase'
import ImageUpload from '@/components/forms/ImageUpload'

export default function CreateEventPage() {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [prevImageUrl, setPrevImageUrl] = useState<string>('')
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    date: '',
    venue: '',
    ticket_price: '',
    status: 'draft',
    category: '',
  })
  const [imageError, setImageError] = useState('')
  const router = useRouter()

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
      name: 'ticket_price',
      label: 'Ticket Price (₹)',
      type: 'number' as const,
      required: true,
      placeholder: 'Enter ticket price',
      validation: {
        min: 0
      }
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
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'Music & Concerts', label: 'Music & Concerts' },
        { value: 'Arts & Culture', label: 'Arts & Culture' },
        { value: 'Business & Networking', label: 'Business & Networking' },
        { value: 'Technology', label: 'Technology' },
        { value: 'Health & Wellness', label: 'Health & Wellness' },
        { value: 'Sports & Fitness', label: 'Sports & Fitness' },
        { value: 'Food & Drink', label: 'Food & Drink' },
        { value: 'Education & Training', label: 'Education & Training' },
        { value: 'Festivals & Fairs', label: 'Festivals & Fairs' },
        { value: 'Charity & Causes', label: 'Charity & Causes' },
        { value: 'Family & Kids', label: 'Family & Kids' },
        { value: 'Fashion & Beauty', label: 'Fashion & Beauty' },
        { value: 'Travel & Outdoor', label: 'Travel & Outdoor' },
        { value: 'Science & Engineering', label: 'Science & Engineering' },
        { value: 'Spirituality', label: 'Spirituality' },
        { value: 'Community', label: 'Community' },
        { value: 'Online Events', label: 'Online Events' },
        { value: 'Other', label: 'Other' }
      ]
    }
  ]

  // State for custom registration fields
  const [formSchema, setFormSchema] = useState<any[]>([])
  const [newField, setNewField] = useState({ name: '', label: '', type: 'text', required: false })

  const handleAddField = () => {
    if (!newField.name || !newField.label) return
    setFormSchema([...formSchema, newField])
    setNewField({ name: '', label: '', type: 'text', required: false })
  }

  const handleRemoveField = (idx: number) => {
    setFormSchema(formSchema.filter((_, i) => i !== idx))
  }

  const handleFieldChange = (name: string, value: any) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleNewFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
    if (type === 'checkbox') {
      setNewField(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setNewField(prev => ({ ...prev, [name]: value }));
    }
  };

  // Helper to delete image from Supabase Storage
  const deleteImageFromStorage = async (url: string) => {
    if (!url) return;
    try {
      // Extract path after the bucket name
      const match = url.match(/event-images\/(.*)$/);
      if (match && match[1]) {
        await supabase.storage.from('event-images').remove([match[1]]);
      }
    } catch (err) {
      // Ignore errors
    }
  };

  // Handle image upload and cleanup
  const handleImageUpload = async (newUrl: string) => {
    if (imageUrl && imageUrl !== newUrl) {
      await deleteImageFromStorage(imageUrl);
    }
    setPrevImageUrl(imageUrl);
    setImageUrl(newUrl);
  };

  // Handle image removal
  const handleImageRemove = async () => {
    if (imageUrl) {
      await deleteImageFromStorage(imageUrl);
      setPrevImageUrl(imageUrl);
      setImageUrl('');
    }
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    if (!imageUrl) {
      setImageError('Event image is required.');
      return;
    } else {
      setImageError('');
    }
    try {
      setLoading(true)

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('You must be logged in to create an event')
        return
      }

      // Generate slug from name
      const slug = generateSlug(formData.name)

      // Create event data, include form_schema and image_url
      const eventData = {
        name: formData.name,
        slug,
        description: formData.description || null,
        date: formData.date,
        venue: formData.venue,
        ticket_price: Number(formData.ticket_price),
        status: formData.status || 'draft',
        category: formData.category || null,
        form_schema: formSchema,
        image_url: imageUrl || null
      }

      const { data, error } = await eventDb.createEvent(eventData, user.id)

      if (error) {
        console.error('Supabase createEvent error:', error);
        alert('Failed to create event: ' + error)
        return
      }

      // Redirect to public event view page
      router.push(`/events/${slug}`)
    } catch (err) {
      console.error('Error creating event:', err)
      alert('Failed to create event. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout title="Create Event">
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
            <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
            <p className="text-gray-600">Set up your event details and start managing registrations</p>
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Event Image <span className="text-red-500">*</span></h2>
          <ImageUpload value={imageUrl} onUpload={handleImageUpload} />
          {imageUrl && (
            <button
              type="button"
              className="mt-2 text-red-600 underline text-sm"
              onClick={handleImageRemove}
            >
              Remove Image
            </button>
          )}
          {imageError && <div className="text-red-600 text-sm mt-2">{imageError}</div>}
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <FormRenderer
            fields={formFields}
            onSubmit={handleSubmit}
            submitText="Create Event"
            loading={loading}
            formData={formState}
            onFieldChange={handleFieldChange}
          />
        </div>

        {/* Secondary Create Event Button (Standalone) */}
        <div className="mb-8 flex justify-center">
          <Button
            className="w-full max-w-xs bg-[#006D92] hover:bg-[#e28618] text-white text-lg font-semibold py-3 shadow-lg"
            onClick={async () => {
              await handleSubmit(formState);
            }}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Event'}
          </Button>
        </div>

        {/* Custom Registration Fields */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">Custom Registration Fields</h2>
          <div className="flex gap-2 mb-4">
            <input
              name="name"
              value={newField.name}
              onChange={e => handleFieldChange(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value)}
              placeholder="Field Name (e.g. company)"
              className="border rounded px-2 py-1 w-32"
            />
            <input
              name="label"
              value={newField.label}
              onChange={e => handleFieldChange(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value)}
              placeholder="Label (e.g. Company Name)"
              className="border rounded px-2 py-1 w-40"
            />
            <select
              name="type"
              value={newField.type}
              onChange={e => handleFieldChange(e.target.name, e.target.value)}
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
                onChange={e => handleFieldChange(e.target.name, e.target.checked)}
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

        {/* Help Text */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#006D92] mb-2">Tips for creating great events:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use a clear, descriptive event name</li>
            <li>• Provide detailed venue information</li>
            <li>• Start with "Draft" status to review before publishing</li>
            <li>• You can edit event details after creation</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  )
} 