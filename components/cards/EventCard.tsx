import React from 'react'
import { Event } from '@/lib/types'
import { formatDate } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Edit, Trash2, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EventCardProps {
  event: Event
  onEdit?: (event: Event) => void
  onDelete?: (eventId: string) => void
  onView?: (event: Event) => void
  showActions?: boolean
  variant?: 'default' | 'compact'
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onEdit,
  onDelete,
  onView,
  showActions = false,
  variant = 'default'
}) => {
  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 truncate">{event.name}</h3>
          <span className={cn(
            'px-2 py-1 rounded-full text-xs font-medium',
            getStatusColor(event.status)
          )}>
            {event.status}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>
        {showActions && (
          <div className="flex items-center gap-2 mt-3">
            {onView && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(event)}
                className="h-8 px-2 bg-[#006D92] text-white hover:bg-[#EF7B45]"
              >
                <Eye className="w-4 h-4" />
              </Button>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(event)}
                className="h-8 px-2 bg-[#006D92] text-white hover:bg-[#EF7B45]"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(event.id)}
                className="h-8 px-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-0 hover:shadow-lg transition-all duration-200 group relative overflow-hidden">
      {event.image_url && (
        <div className="h-48 w-full overflow-hidden relative">
          <img
            src={event.image_url}
            alt={event.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
            {event.description && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {event.description}
              </p>
            )}
          </div>
          <span className={cn(
            'px-3 py-1 rounded-full text-xs font-medium ml-4',
            getStatusColor(event.status)
          )}>
            {event.status}
          </span>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar className="w-5 h-5 text-cosmic-blue" />
            <span className="text-sm">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="w-5 h-5 text-cosmic-orange" />
            <span className="text-sm">{event.venue}</span>
          </div>
        </div>

        {showActions && (
          <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
            {onView && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(event)}
                className="flex-1 bg-[#006D92] text-white hover:bg-[#EF7B45]"
              >
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
            )}
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(event)}
                className="flex-1 bg-[#006D92] text-white hover:bg-[#EF7B45]"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(event.id)}
                className="flex-1 bg-[#006D92] text-white hover:bg-[#EF7B45]"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
        )}

        {onView && (
          <button
            onClick={() => onView(event)}
            className="absolute bottom-4 right-4 bg-cosmic-blue text-white px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:bg-cosmic-orange"
          >
            View
          </button>
        )}
      </div>
    </div>
  )
}

export default EventCard 