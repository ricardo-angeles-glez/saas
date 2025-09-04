'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getProfile, updateProfile } from '@/lib/actions/profile-actions'

export function ProfileForm() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setLoading(true)
      const result = await getProfile()
      if (result.success) {
        setProfile(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setUpdating(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData(event.target)
      const result = await updateProfile(formData)
      
      if (result.success) {
        setProfile(result.data)
        setSuccess('Profile updated successfully!')
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Failed to update profile')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Loading your profile...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (error && !profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Error loading profile</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error}</p>
          <Button onClick={loadProfile} className="mt-4">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Manage your profile information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={profile?.email || ''}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              name="first_name"
              type="text"
              defaultValue={profile?.first_name || ''}
              placeholder="Enter your first name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar_url">Avatar URL</Label>
            <Input
              id="avatar_url"
              name="avatar_url"
              type="url"
              defaultValue={profile?.avatar_url || ''}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm">
              {success}
            </div>
          )}

          <Button type="submit" disabled={updating}>
            {updating ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>

        {profile && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Profile Information</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>ID:</strong> {profile.id}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>First Name:</strong> {profile.first_name || 'Not set'}</p>
              <p><strong>Avatar URL:</strong> {profile.avatar_url || 'Not set'}</p>
              <p><strong>Created:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
              <p><strong>Updated:</strong> {new Date(profile.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
