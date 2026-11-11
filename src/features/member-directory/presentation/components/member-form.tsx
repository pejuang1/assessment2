import React, { useState } from 'react'
import { User, Mail, Briefcase, Building } from 'lucide-react'
import {
  Member,
  MemberStatus,
  Department,
  EmploymentType,
} from '../../domain/member'
import { CreateMemberInput, UpdateMemberInput } from '../../use-cases/member-repository'

interface MemberFormProps {
  initialValues?: Partial<Member>
  onSubmit: (data: any) => Promise<void>
  onCancel: () => void
  onDelete?: () => void
  submitLabel?: string
  isSubmitting?: boolean
}

export const MemberForm: React.FC<MemberFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  onDelete,
  submitLabel = 'Save Changes',
  isSubmitting = false,
}) => {
  const [fullName, setFullName] = useState(initialValues?.fullName || '')
  const [email, setEmail] = useState(initialValues?.email || '')
  const [status, setStatus] = useState<MemberStatus>(initialValues?.status || 'Active')
  const [roleTitle, setRoleTitle] = useState(initialValues?.roleTitle || '')
  const [department, setDepartment] = useState<Department>(
    initialValues?.department || 'Engineering'
  )
  const [employmentType, setEmploymentType] = useState<EmploymentType>(
    initialValues?.employmentType || 'Full-time Permanent'
  )
  const [bioNotes, setBioNotes] = useState(initialValues?.bioNotes || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      fullName,
      email,
      status,
      accountStatusLabel:
        status === 'Active'
          ? 'Active - Full Workspace Access'
          : 'Inactive - Suspended',
      roleTitle,
      department,
      employmentType,
      bioNotes,
      joinedDate: initialValues?.joinedDate || 'Nov 11, 2026',
      joinedMonthYear: initialValues?.joinedMonthYear || 'November 2026',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form-sections-container">
      {/* General Information */}
      <div className="form-card">
        <h2>General Information</h2>
        <p className="form-card-subtitle">
          Update personal records, contact credentials, and communication metadata.
        </p>

        <div className="form-row-two-col">
          <div className="form-group">
            <label className="form-label">
              Full Name <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <User className="input-icon" size={16} />
              <input
                type="text"
                required
                className="form-control"
                placeholder="e.g. Sarah Jenkins"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <span className="form-hint">Displayed publicly across collaborative repositories.</span>
          </div>

          <div className="form-group">
            <label className="form-label">
              Work Email <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={16} />
              <input
                type="email"
                required
                className="form-control"
                placeholder="e.g. sarah.jenkins@acme.corp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <span className="form-hint">Used for SSO sign-in and security notifications.</span>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Account Status</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value as MemberStatus)}
          >
            <option value="Active">Active - Full Workspace Access</option>
            <option value="Inactive">Inactive - Suspended</option>
          </select>
          <span className="form-hint">Controls login eligibility across organization SSO.</span>
        </div>
      </div>

      {/* Work Details & Permissions */}
      <div className="form-card">
        <h2>Work Details & Permissions</h2>
        <p className="form-card-subtitle">
          Manage departmental allocations, administrative scopes, and governance clearance.
        </p>

        <div className="form-row-two-col">
          <div className="form-group">
            <label className="form-label">
              Job Title <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <Briefcase className="input-icon" size={16} />
              <input
                type="text"
                required
                className="form-control"
                placeholder="e.g. Staff Frontend Engineer"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Department <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <Building className="input-icon" size={16} />
              <select
                className="form-control"
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Product">Product</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Employment Type</label>
          <select
            className="form-control"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
          >
            <option value="Full-time Permanent">Full-time Permanent</option>
            <option value="Contract">Contract</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Bio & Administrative Notes</label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Mainly working on low fidelity and high fidelity design generation..."
            value={bioNotes}
            onChange={(e) => setBioNotes(e.target.value)}
          />
        </div>
      </div>

      {/* Footer buttons */}
      <div className="form-footer-actions">
        {onDelete ? (
          <button type="button" className="btn-danger-outline" onClick={onDelete}>
            Delete Member
          </button>
        ) : (
          <div />
        )}

        <div className="right-buttons">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : submitLabel}
          </button>
        </div>
      </div>
    </form>
  )
}
