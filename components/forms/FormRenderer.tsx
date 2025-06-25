'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'date' | 'number'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  validation?: {
    pattern?: string
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
  }
}

interface FormRendererProps {
  fields: FormField[]
  onSubmit: (data: Record<string, any>) => void
  submitText?: string
  loading?: boolean
  initialData?: Record<string, any>
  className?: string
  formData?: Record<string, any>
  onFieldChange?: (name: string, value: any) => void
}

const FormRenderer: React.FC<FormRendererProps> = ({
  fields,
  onSubmit,
  submitText = 'Submit',
  loading = false,
  initialData = {},
  className,
  formData: controlledFormData,
  onFieldChange
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Use controlled formData if provided
  const currentFormData = controlledFormData || formData;

  const validateField = (name: string, value: any, field: FormField): string => {
    if (field.required && (!value || value.toString().trim() === '')) {
      return `${field.label} is required`
    }

    if (value && field.validation) {
      if (field.validation.minLength && value.length < field.validation.minLength) {
        return `${field.label} must be at least ${field.validation.minLength} characters`
      }

      if (field.validation.maxLength && value.length > field.validation.maxLength) {
        return `${field.label} must be no more than ${field.validation.maxLength} characters`
      }

      if (field.validation.pattern && !new RegExp(field.validation.pattern).test(value)) {
        return `${field.label} format is invalid`
      }

      if (field.validation.min && Number(value) < field.validation.min) {
        return `${field.label} must be at least ${field.validation.min}`
      }

      if (field.validation.max && Number(value) > field.validation.max) {
        return `${field.label} must be no more than ${field.validation.max}`
      }
    }

    return ''
  }

  const handleInputChange = (name: string, value: any, field: FormField) => {
    if (onFieldChange) {
      onFieldChange(name, value)
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Wrapper for event-based onChange to support controlled parent
  const handleInputChangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: FormField) => {
    const { name, value } = e.target;
    handleInputChange(name, value, field);
  };

  const handleBlur = (name: string, value: any, field: FormField) => {
    const error = validateField(name, value, field)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: Record<string, string> = {}
    fields.forEach(field => {
      const error = validateField(field.name, currentFormData[field.name], field)
      if (error) {
        newErrors[field.name] = error
      }
    })

    setErrors(newErrors)

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      onSubmit(currentFormData)
    }
  }

  const renderField = (field: FormField) => {
    const value = currentFormData[field.name] || ''
    const error = errors[field.name]
    const baseInputClasses = cn(
      'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cosmic-blue focus:border-transparent',
      error ? 'border-red-300' : 'border-gray-300'
    )
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={value}
            onChange={(e) => handleInputChangeEvent(e, field)}
            onBlur={(e) => handleBlur(field.name, e.target.value, field)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            className={baseInputClasses}
          />
        )
      case 'select':
        return (
          <select
            name={field.name}
            value={value}
            onChange={(e) => handleInputChangeEvent(e, field)}
            onBlur={(e) => handleBlur(field.name, e.target.value, field)}
            required={field.required}
            className={baseInputClasses}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      case 'date':
        return (
          <input
            type="date"
            name={field.name}
            value={value}
            onChange={(e) => handleInputChangeEvent(e, field)}
            onBlur={(e) => handleBlur(field.name, e.target.value, field)}
            required={field.required}
            className={baseInputClasses}
          />
        )
      case 'number':
        return (
          <input
            type="number"
            name={field.name}
            value={value}
            onChange={(e) => handleInputChangeEvent(e, field)}
            onBlur={(e) => handleBlur(field.name, e.target.value, field)}
            placeholder={field.placeholder}
            required={field.required}
            min={field.validation?.min}
            max={field.validation?.max}
            className={baseInputClasses}
          />
        )
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={(e) => handleInputChangeEvent(e, field)}
            onBlur={(e) => handleBlur(field.name, e.target.value, field)}
            placeholder={field.placeholder}
            required={field.required}
            pattern={field.validation?.pattern}
            minLength={field.validation?.minLength}
            maxLength={field.validation?.maxLength}
            className={baseInputClasses}
          />
        )
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField(field)}
          {errors[field.name] && (
            <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
          )}
        </div>
      ))}
      
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-cosmic-blue hover:bg-cosmic-blue/90"
      >
        {loading ? 'Processing...' : submitText}
      </Button>
    </form>
  )
}

export default FormRenderer 