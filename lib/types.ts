export interface User {
  id: string
  email: string
  role: 'admin' | 'ticketeer' | 'public' | 'future_roles'
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  name: string
  slug: string
  description: string | null
  date: string
  venue: string
  status: 'draft' | 'published' | 'cancelled'
  created_by: string
  created_at: string
  updated_at: string
  form_schema?: any[]
}

export interface CreateEventData {
  name: string
  slug: string
  description?: string
  date: string
  venue: string
  status?: 'draft' | 'published' | 'cancelled'
  form_schema?: any[]
}

export interface UpdateEventData {
  name?: string
  slug?: string
  description?: string
  date?: string
  venue?: string
  status?: 'draft' | 'published' | 'cancelled'
  form_schema?: any[]
}

export type UserRole = User['role']

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
} 