/**
 * Profile related type definitions
 */

import { Database } from './database'

// Extract profile types from database schema
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

// Additional profile-related types
export interface ProfileWithUser extends Profile {
  user?: {
    id: string
    email: string
    created_at: string
  }
}

export interface CreateProfileData {
  first_name?: string
  avatar_url?: string
  email: string
}

export interface UpdateProfileData {
  first_name?: string
  avatar_url?: string
  email?: string
}
