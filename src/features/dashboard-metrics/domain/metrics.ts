export interface MetricCardData {
  title: string
  value: number | string
  subtext: string
  subtextHighlight?: string
  iconType: 'users' | 'activity' | 'departments' | 'invites'
}

export interface DirectoryMetrics {
  totalMembers: number
  totalMembersChange: string // "+12 this month"
  activeNow: number
  activeNowRate: string // "94% live activity"
  departmentsCount: number
  departmentsLabel: string // "8 active units"
  pendingInvites: number
  pendingInvitesLabel: string // "3 expiring soon"
}

export function computeMetricsFromMembers(
  memberCount: number,
  activeCount: number
): DirectoryMetrics {
  return {
    totalMembers: 148,
    totalMembersChange: '+12 this month',
    activeNow: 132,
    activeNowRate: `${Math.round((activeCount / (memberCount || 1)) * 100)}% live activity`,
    departmentsCount: 8,
    departmentsLabel: '8 active units',
    pendingInvites: 5,
    pendingInvitesLabel: '3 expiring soon',
  }
}
