import React from 'react'
import { User } from 'lucide-react'
import { CurrentUser } from '@/features/user-profile/domain/user-profile'

interface TopNavbarProps {
  user: CurrentUser | null
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ user }) => {
  return (
    <header className="top-header">
      <div className="user-profile-badge">
        <div className="user-avatar-circle">
          {user?.avatarInitials ? (
            user.avatarInitials
          ) : (
            <User size={18} />
          )}
        </div>
        <div>
          <div className="user-meta-name">{user?.name || 'Alex Vance'}</div>
          <div className="user-meta-role">{user?.role || 'Lead Architect'}</div>
        </div>
      </div>
    </header>
  )
}
