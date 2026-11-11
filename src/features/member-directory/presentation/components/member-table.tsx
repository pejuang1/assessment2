import React from 'react'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { Member } from '../../domain/member'

interface MemberTableProps {
  members: Member[]
  selectedIds: string[]
  onToggleSelect: (id: string) => void
  onToggleSelectAll: () => void
  onDelete: (id: string) => void
}

export const MemberTable: React.FC<MemberTableProps> = ({
  members,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onDelete,
}) => {
  const isAllSelected = members.length > 0 && selectedIds.length === members.length

  return (
    <div className="table-container">
      <table className="members-table">
        <thead>
          <tr>
            <th style={{ width: '40px' }}>
              <input
                type="checkbox"
                aria-label="Select all members"
                checked={isAllSelected}
                onChange={onToggleSelectAll}
              />
            </th>
            <th>Member</th>
            <th>Role / Title</th>
            <th>Department</th>
            <th>Status</th>
            <th>Joined Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '32px' }}>
                No members found matching your criteria.
              </td>
            </tr>
          ) : (
            members.map((member) => {
              const isSelected = selectedIds.includes(member.id)
              return (
                <tr key={member.id}>
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`Select ${member.fullName}`}
                      checked={isSelected}
                      onChange={() => onToggleSelect(member.id)}
                    />
                  </td>
                  <td>
                    <div className="member-cell">
                      <div className="member-avatar">{member.avatarInitials}</div>
                      <div>
                        <div className="member-name">{member.fullName}</div>
                        <div className="member-email">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{member.roleTitle}</td>
                  <td>
                    <span
                      style={{
                        background: '#f1f5f9',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      {member.department}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        member.status === 'Active' ? 'active' : 'inactive'
                      }`}
                    >
                      <span className="status-dot" />
                      {member.status}
                    </span>
                  </td>
                  <td>{member.joinedDate}</td>
                  <td>
                    <div className="action-buttons">
                      <Link
                        href={`/members/${member.id}`}
                        className="btn-edit"
                        aria-label={`Edit ${member.fullName}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn-delete"
                        onClick={() => onDelete(member.id)}
                        aria-label={`Delete ${member.fullName}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
