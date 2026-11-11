import { describe, it, expect } from 'vitest'
import { Member, getInitials, filterMembers } from './member'

describe('Member Domain', () => {
  const sampleMembers: Member[] = [
    {
      id: '1',
      code: '#MEM-2048',
      fullName: 'Sarah Jenkins',
      email: 'sarah.jenkins@membercore.internal',
      roleTitle: 'Staff Frontend Engineer',
      department: 'Engineering',
      status: 'Active',
      accountStatusLabel: 'Active - Full Workspace Access',
      joinedDate: 'Feb 14, 2022',
      joinedMonthYear: 'February 2022',
      employmentType: 'Full-time Permanent',
      bioNotes: 'Frontend architecture lead',
      avatarInitials: 'SJ',
    },
    {
      id: '2',
      code: '#MEM-2049',
      fullName: 'Elena Rostova',
      email: 'elena.rostova@membercore.internal',
      roleTitle: 'Product Designer',
      department: 'Design',
      status: 'Active',
      accountStatusLabel: 'Active - Full Workspace Access',
      joinedDate: 'Jan 10, 2023',
      joinedMonthYear: 'January 2023',
      employmentType: 'Full-time Permanent',
      bioNotes: 'Design system lead',
      avatarInitials: 'ER',
    },
    {
      id: '3',
      code: '#MEM-2050',
      fullName: 'Marcus Chen',
      email: 'marcus.chen@membercore.internal',
      roleTitle: 'Fullstack Developer',
      department: 'Engineering',
      status: 'Inactive',
      accountStatusLabel: 'Inactive - Suspended',
      joinedDate: 'Jun 19, 2023',
      joinedMonthYear: 'June 2023',
      employmentType: 'Contract',
      bioNotes: 'Backend services focus',
      avatarInitials: 'MC',
    },
  ]

  it('MD-01: should compute correct initials from full name', () => {
    expect(getInitials('Sarah Jenkins')).toBe('SJ')
    expect(getInitials('Alex')).toBe('AL')
    expect(getInitials('David Kim')).toBe('DK')
  })

  it('MD-02: should filter members by search query matching name, email, or role', () => {
    const byName = filterMembers(sampleMembers, { searchQuery: 'Sarah' })
    expect(byName).toHaveLength(1)
    expect(byName[0].fullName).toBe('Sarah Jenkins')

    const byEmail = filterMembers(sampleMembers, { searchQuery: 'marcus.chen' })
    expect(byEmail).toHaveLength(1)
    expect(byEmail[0].fullName).toBe('Marcus Chen')

    const byRole = filterMembers(sampleMembers, { searchQuery: 'Designer' })
    expect(byRole).toHaveLength(1)
    expect(byRole[0].fullName).toBe('Elena Rostova')
  })

  it('MD-03: should filter members by status and department', () => {
    const activeEngineering = filterMembers(sampleMembers, {
      searchQuery: '',
      status: 'Active',
      department: 'Engineering',
    })
    expect(activeEngineering).toHaveLength(1)
    expect(activeEngineering[0].fullName).toBe('Sarah Jenkins')

    const inactiveMembers = filterMembers(sampleMembers, {
      searchQuery: '',
      status: 'Inactive',
    })
    expect(inactiveMembers).toHaveLength(1)
    expect(inactiveMembers[0].fullName).toBe('Marcus Chen')
  })
})
