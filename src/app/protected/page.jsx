import { redirect } from 'next/navigation'

import { LogoutButton } from '@/components/logout-button'
import { ProfileForm } from '@/components/profile-form'
import { createClient } from '@/lib/server'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <LogoutButton />
        </div>
        
        <div className="text-center">
          <p className="text-lg">
            Welcome back, <span className="font-semibold">{data.claims.email}</span>!
          </p>
        </div>

        <ProfileForm />
      </div>
    </div>
  );
}
