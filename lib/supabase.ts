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
          status?: 'draft' | 'published' | 'cancelled'
          created_by?: string
          created_at?: string
          updated_at?: string
          form_schema?: any[]
          deleted_at?: string | null
        }
      }
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type Event = Database['public']['Tables']['events']['Row']
export type UserRole = User['role'] 