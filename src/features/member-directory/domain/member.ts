export type MemberStatus = 'Active' | 'Inactive'

export type Department = 'Engineering' | 'Design' | 'Product' | 'Operations'

export type EmploymentType = 'Full-time Permanent' | 'Contract' | 'Part-time' | 'Internship'

export interface Member {
  id: string
  code: string // e.g. "#MEM-2048"
  fullName: string
  email: string
  roleTitle: string
  department: Department
  status: MemberStatus
  accountStatusLabel: string // "Active - Full Workspace Access"
  joinedDate: string // e.g. "Feb 14, 2022"
  joinedMonthYear: string // e.g. "March 2022"
  repositoriesCount?: number // e.g. 42
  deploymentsCount?: number // e.g. 1489
  employmentType: EmploymentType
  bioNotes: string
  avatarInitials: string
}

export interface MemberFilters {
  searchQuery: string
  status?: MemberStatus | 'All'
  department?: Department | 'All'
}

export function getInitials(name: string): string {
  if (!name.trim()) return ''
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function filterMembers(members: Member[], filters: MemberFilters): Member[] {
  const query = filters.searchQuery.trim().toLowerCase()

  return members.filter((member) => {
    // Search query matches name, email, or role
    const matchesQuery =
      !query ||
      member.fullName.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query) ||
      member.roleTitle.toLowerCase().includes(query)

    // Status filter
    const matchesStatus =
      !filters.status || filters.status === 'All' || member.status === filters.status

    // Department filter
    const matchesDept =
      !filters.department || filters.department === 'All' || member.department === filters.department

    return matchesQuery && matchesStatus && matchesDept
  })
}
