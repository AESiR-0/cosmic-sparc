import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Service role client for admin operations (only if service key is available)
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'ticketeer' | 'public' | 'future_roles'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role?: 'admin' | 'ticketeer' | 'public' | 'future_roles'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'ticketeer' | 'public' | 'future_roles'
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
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
          deleted_at?: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          date: string
          venue: string
          category: string
          status?: 'draft' | 'published' | 'cancelled'
          created_by: string
          created_at?: string
          updated_at?: string
          form_schema?: any[]
          deleted_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          date?: string
          venue?: string
          category?: string
          status?: 'draft' | 'published' | 'cancelled'
          created_by?: string
          created_at?: string
          updated_at?: string
          form_schema?: any[]
          deleted_at?: string | null
        }
      }
      event_ticketeers: {
        Row: {
          id: string
          event_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          created_at?: string
        }
      }
      registrations: {
        Row: {
          id: string
          event_id: string
          user_id: string | null
          name: string
          email: string
          phone: string | null
          form_data: any
          ticket_id: string
          status: 'registered' | 'entered'
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id?: string | null
          name: string
          email: string
          phone?: string | null
          form_data?: any
          ticket_id: string
          status?: 'registered' | 'entered'
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string | null
          name?: string
          email?: string
          phone?: string | null
          form_data?: any
          ticket_id?: string
          status?: 'registered' | 'entered'
          created_at?: string
        }
      }
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type Event = Database['public']['Tables']['events']['Row']
export type EventTicketeer = Database['public']['Tables']['event_ticketeers']['Row']
export type Registration = Database['public']['Tables']['registrations']['Row']
export type UserRole = User['role'] 