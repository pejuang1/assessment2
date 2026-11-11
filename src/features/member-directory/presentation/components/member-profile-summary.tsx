import React from 'react'
import { Copy } from 'lucide-react'
import { Member } from '../../domain/member'

interface MemberProfileSummaryProps {
  member: Member
  onCopyId: () => void
}

export const MemberProfileSummary: React.FC<MemberProfileSummaryProps> = ({
  member,
  onCopyId,
}) => {
  return (
    <div className="profile-summary-card">
      <div className="large-avatar-box">{member.avatarInitials}</div>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{member.fullName}</h3>
      <p style={{ color: '#4338ca', fontSize: '13px', fontWeight: 500, marginTop: '2px' }}>
        {member.roleTitle}
      </p>
      <p style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>{member.email}</p>

      <div className="stats-counter-row">
        <div className="stat-item">
          <strong>{member.repositoriesCount || 0}</strong>
          <span>Repositories</span>
        </div>
        <div className="stat-item" style={{ borderLeft: '1px solid #e2e8f0' }}>
          <strong>{(member.deploymentsCount || 0).toLocaleString()}</strong>
          <span>Deployments</span>
        </div>
      </div>
    </div>
  )
}
