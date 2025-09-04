import { createClient } from './server'
import { Profile, ProfileUpdate, CreateProfileData } from '@/types'

/**
 * Get the current user's profile
 */
export async function getCurrentUserProfile() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('No authenticated user')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch profile: ${error.message}`)
  }

  return profile
}

/**
 * Update the current user's profile
 */
export async function updateUserProfile(updates: ProfileUpdate) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('No authenticated user')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`)
  }

  return profile
}

/**
 * Create a new profile (usually called by trigger, but available for manual creation)
 */
export async function createUserProfile(profileData: CreateProfileData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('No authenticated user')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .insert({
      id: user.id,
      ...profileData
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create profile: ${error.message}`)
  }

  return profile
}

/**
 * Delete the current user's profile
 */
export async function deleteUserProfile() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('No authenticated user')
  }

  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', user.id)

  if (error) {
    throw new Error(`Failed to delete profile: ${error.message}`)
  }

  return true
}
