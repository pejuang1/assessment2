import { describe, it, expect } from 'vitest'
import {
  memberDirectorySlice,
  setMembers,
  setSearchQuery,
  toggleSelectMember,
  toggleSelectAll,
  deleteMemberSuccess,
} from '../slices/member-directory-slice'
import { Member } from '@/features/member-directory/domain/member'

describe('Member Directory Store Slice', () => {
  const sampleMember: Member = {
    id: '1',
    code: '#MEM-2048',
    fullName: 'Sarah Jenkins',
    email: 'sarah.jenkins@acme.corp',
    roleTitle: 'Staff Frontend Engineer',
    department: 'Engineering',
    status: 'Active',
    accountStatusLabel: 'Active - Full Workspace Access',
    joinedDate: 'Feb 14, 2022',
    joinedMonthYear: 'March 2022',
    employmentType: 'Full-time Permanent',
    bioNotes: '',
    avatarInitials: 'SJ',
  }

  it('STORE-01: should set members correctly', () => {
    const nextState = memberDirectorySlice.reducer(
      undefined,
      setMembers([sampleMember])
    )
    expect(nextState.members).toHaveLength(1)
    expect(nextState.members[0].fullName).toBe('Sarah Jenkins')
  })

  it('STORE-02: should update search query', () => {
    const nextState = memberDirectorySlice.reducer(
      undefined,
      setSearchQuery('Elena')
    )
    expect(nextState.searchQuery).toBe('Elena')
  })

  it('STORE-03: should toggle selection and select all', () => {
    let state = memberDirectorySlice.reducer(undefined, toggleSelectMember('1'))
    expect(state.selectedMemberIds).toEqual(['1'])

    state = memberDirectorySlice.reducer(state, toggleSelectMember('1'))
    expect(state.selectedMemberIds).toEqual([])

    state = memberDirectorySlice.reducer(state, toggleSelectAll(['1', '2', '3']))
    expect(state.selectedMemberIds).toHaveLength(3)

    state = memberDirectorySlice.reducer(state, toggleSelectAll(['1', '2', '3']))
    expect(state.selectedMemberIds).toEqual([])
  })

  it('STORE-04: should remove deleted member and clean up selection', () => {
    const initialState = {
      members: [sampleMember],
      loading: false,
      error: null,
      searchQuery: '',
      statusFilter: 'All' as const,
      departmentFilter: 'All' as const,
      selectedMemberIds: ['1'],
    }
    const state = memberDirectorySlice.reducer(
      initialState,
      deleteMemberSuccess('1')
    )
    expect(state.members).toHaveLength(0)
    expect(state.selectedMemberIds).toEqual([])
  })
})
