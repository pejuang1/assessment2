'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import { useAppDispatch } from '@/composition/store/hooks'
import {
  updateMemberSuccess,
  deleteMemberSuccess,
} from '@/composition/store/slices/member-directory-slice'
import {
  getMemberByIdController,
  updateMemberController,
  deleteMemberController,
} from '../../controllers/member-controller'
import { Member } from '../../domain/member'
import { MemberProfileSummary } from '../components/member-profile-summary'
import { MemberForm } from '../components/member-form'

interface MemberDetailPageProps {
  memberId: string
}

export const MemberDetailPage: React.FC<MemberDetailPageProps> = ({ memberId }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [member, setMember] = useState<Member | null>(null)
  const [copied, setCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    getMemberByIdController(memberId).then((data) => {
      setMember(data)
    })
  }, [memberId])

  if (!member) {
    return (
      <div style={{ padding: '48px', textAlign: 'center' }}>
        <p>Loading member details...</p>
      </div>
    )
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(member.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleUpdate = async (formData: any) => {
    setIsSubmitting(true)
    try {
      const updated = await updateMemberController(member.id, formData)
      dispatch(updateMemberSuccess(updated))
      setMember(updated)
      router.push('/')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this member?')) {
      const ok = await deleteMemberController(member.id)
      if (ok) {
        dispatch(deleteMemberSuccess(member.id))
        router.push('/')
      }
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
            <div className="detail-title-row">
              <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                {member.fullName}
              </h1>
              <span
                className={`status-badge ${
                  member.status === 'Active' ? 'active' : 'inactive'
                }`}
              >
                <span className="status-dot" />
                {member.status}
              </span>
            </div>
            <div className="detail-meta-text">
              ID: {member.code} · Joined {member.joinedMonthYear}
            </div>
          </div>
        </div>

        <div>
          <button className="btn-secondary" onClick={handleCopyId}>
            {copied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
            {copied ? 'Copied ID' : 'Copy ID'}
          </button>
        </div>
      </div>

      <div className="form-grid-layout">
        <MemberProfileSummary member={member} onCopyId={handleCopyId} />
        <MemberForm
          initialValues={member}
          onSubmit={handleUpdate}
          onCancel={() => router.push('/')}
          onDelete={handleDelete}
          submitLabel="Save Changes"
          isSubmitting={isSubmitting}
        />
      </div>
    </main>
  )
}
