import React from 'react'
import { Search } from 'lucide-react'

interface MemberFilterBarProps {
  searchQuery: string
  onSearchChange: (val: string) => void
}

export const MemberFilterBar: React.FC<MemberFilterBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="table-toolbar">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, email, or role..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search members"
        />
      </div>
    </div>
  )
}
