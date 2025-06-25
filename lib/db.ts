import { supabase, supabaseAdmin } from '@/lib/supabase'
import { Event, CreateEventData, UpdateEventData, User, ApiResponse } from '@/lib/types'

// Event CRUD operations
export const eventDb = {
  // Get all events for admin (exclude soft-deleted by default)
  async getAllEvents(includeDeleted = false): Promise<ApiResponse<Event[]>> {
    try {
      let query = supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      if (!includeDeleted) {
        query = query.is('deleted_at', null);
      }
      const { data, error } = await query;
      if (error) throw error;
      return { data, error: null, loading: false };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Failed to fetch events', 
        loading: false 
      };
    }
  },

  // Get event by slug (exclude soft-deleted by default)
  async getEventBySlug(slug: string, includeDeleted = false): Promise<ApiResponse<Event>> {
    try {
      let query = supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .single();
      if (!includeDeleted) {
        query = query.is('deleted_at', null);
      }
      const { data, error } = await query;
      if (error) throw error;
      return { data, error: null, loading: false };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Event not found', 
        loading: false 
      };
    }
  },

  // Get event by ID (exclude soft-deleted by default)
  async getEventById(id: string, includeDeleted = false): Promise<ApiResponse<Event>> {
    try {
      let query = supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
      if (!includeDeleted) {
        query = query.is('deleted_at', null);
      }
      const { data, error } = await query;
      if (error) throw error;
      return { data, error: null, loading: false };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Event not found', 
        loading: false 
      };
    }
  },

  // Create new event
  async createEvent(eventData: CreateEventData, userId: string): Promise<ApiResponse<Event>> {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert({
          ...eventData,
          created_by: userId,
          status: eventData.status || 'draft',
          form_schema: eventData.form_schema || null
        })
        .select()
        .single()

      if (error) throw error

      return { data, error: null, loading: false }
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Failed to create event', 
        loading: false 
      }
    }
  },

  // Update event
  async updateEvent(id: string, eventData: UpdateEventData): Promise<ApiResponse<Event>> {
    try {
      const { data, error } = await supabase
        .from('events')
        .update({
          ...eventData,
          updated_at: new Date().toISOString(),
          form_schema: eventData.form_schema || null
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return { data, error: null, loading: false }
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Failed to update event', 
        loading: false 
      }
    }
  },

  // Soft delete event
  async deleteEvent(id: string): Promise<ApiResponse<boolean>> {
    try {
      const { error } = await supabase
        .from('events')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
      return { data: true, error: null, loading: false };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Failed to delete event', 
        loading: false 
      };
    }
  },

  // Restore soft-deleted event
  async restoreEvent(id: string): Promise<ApiResponse<boolean>> {
    try {
      const { error } = await supabase
        .from('events')
        .update({ deleted_at: null })
        .eq('id', id);
      if (error) throw error;
      return { data: true, error: null, loading: false };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Failed to restore event', 
        loading: false 
      };
    }
  }
}

// User operations
export const userDb = {
  // Create user in users table after auth signup
  async createUser(userId: string, email: string, role: 'admin' | 'ticketeer' | 'public' = 'admin'): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: email,
          role: role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      return { data, error: null, loading: false }
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Failed to create user', 
        loading: false 
      }
    }
  },

  // Get current user with role
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !authUser) {
        throw new Error('Not authenticated')
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (error) throw error

      return { data, error: null, loading: false }
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Failed to get user', 
        loading: false 
      }
    }
  },

  // Check if user has admin role
  async isAdmin(): Promise<boolean> {
    const { data } = await userDb.getCurrentUser()
    return data?.role === 'admin'
  },

  // Check if user has ticketeer role
  async isTicketeer(): Promise<boolean> {
    const { data } = await userDb.getCurrentUser()
    return data?.role === 'ticketeer'
  },

  // Setup specific users for testing
  async setupTestUsers(): Promise<void> {
    if (!supabaseAdmin) {
      console.error('Supabase admin client not available. Please set SUPABASE_SERVICE_ROLE_KEY in your environment variables.')
      throw new Error('Admin client not available. Use manual setup instead.')
    }

    const testUsers = [
      { email: 'pratiechellani@gmail.com', role: 'public' as const },
      { email: 'workbyprat@gmail.com', role: 'ticketeer' as const },
      { email: 'cyborgkiller1008@gmail.com', role: 'admin' as const }
    ]

    for (const user of testUsers) {
      try {
        // Check if user already exists
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single()

        if (!existingUser) {
          // Create auth user first using admin client
          const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: user.email,
            password: 'password123', // Default password for testing
            email_confirm: true // Automatically confirm email for development
          })

          if (authData.user) {
            // Create user in users table
            await userDb.createUser(authData.user.id, user.email, user.role)
            console.log(`Created user: ${user.email} with role: ${user.role}`)
          }
        } else {
          console.log(`User already exists: ${user.email}`)
        }
      } catch (error) {
        console.error(`Failed to create user ${user.email}:`, error)
      }
    }
  }
}

// Utility functions
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
} 