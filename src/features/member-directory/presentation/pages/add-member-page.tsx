'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useAppDispatch } from '@/composition/store/hooks'
import { addMemberSuccess } from '@/composition/store/slices/member-directory-slice'
import { createMemberController } from '../../controllers/member-controller'
import { MemberForm } from '../components/member-form'

export const AddMemberPage: React.FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreate = async (formData: any) => {
    setIsSubmitting(true)
    try {
      const created = await createMemberController(formData)
      dispatch(addMemberSuccess(created))
      router.push('/')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="main-content">
      <div className="detail-header">
        <div className="detail-header-left">
          <Link href="/" className="back-btn" aria-label="Back to directory">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
              Add New Member
            </h1>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '840px', margin: '0 auto' }}>
        <MemberForm
          onSubmit={handleCreate}
          onCancel={() => router.push('/')}
          submitLabel="Save Changes"
          isSubmitting={isSubmitting}
        />
      </div>
    </main>
  )
}
