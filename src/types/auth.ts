/**
 * Authentication related type definitions
 */

import { User } from '@supabase/supabase-js'

export interface AuthUser extends User {
  // Extend the base User type if needed
}

export interface AuthSession {
  user: AuthUser
  access_token: string
  refresh_token: string
}

export interface AuthError {
  message: string
  status?: number
}
