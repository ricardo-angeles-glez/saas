'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getCurrentUserProfile, updateUserProfile, createUserProfile } from '../profile'
import { ProfileUpdate, CreateProfileData } from '@/types'

/**
 * Server action to get the current user's profile
 */
export async function getProfile() {
  try {
    const profile = await getCurrentUserProfile()
    return { success: true, data: profile }
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Failed to fetch profile' 
    }
  }
}

/**
 * Server action to update the current user's profile
 */
export async function updateProfile(formData) {
  try {
    const updates = {
      first_name: formData.get('first_name') || null,
      avatar_url: formData.get('avatar_url') || null,
      email: formData.get('email')
    }

    // Remove empty strings and convert to null
    Object.keys(updates).forEach(key => {
      if (updates[key] === '') {
        updates[key] = null
      }
    })

    const profile = await updateUserProfile(updates)
    
    revalidatePath('/protected')
    return { success: true, data: profile }
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Failed to update profile' 
    }
  }
}

/**
 * Server action to create a new profile
 */
export async function createProfile(formData) {
  try {
    const profileData = {
      first_name: formData.get('first_name') || null,
      avatar_url: formData.get('avatar_url') || null,
      email: formData.get('email')
    }

    // Remove empty strings and convert to null
    Object.keys(profileData).forEach(key => {
      if (profileData[key] === '') {
        profileData[key] = null
      }
    })

    const profile = await createUserProfile(profileData)
    
    revalidatePath('/protected')
    return { success: true, data: profile }
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Failed to create profile' 
    }
  }
}
