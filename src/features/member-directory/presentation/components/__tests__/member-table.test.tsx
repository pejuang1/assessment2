import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { MemberTable } from '../member-table'
import { Member } from '../../../domain/member'

describe('MemberTable Component', () => {
  const members: Member[] = [
    {
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
    },
  ]

  it('COMP-01: should render member row and handle callbacks', () => {
    const onToggleSelect = vi.fn()
    const onToggleSelectAll = vi.fn()
    const onDelete = vi.fn()

    render(
      <MemberTable
        members={members}
        selectedIds={[]}
        onToggleSelect={onToggleSelect}
        onToggleSelectAll={onToggleSelectAll}
        onDelete={onDelete}
      />
    )

    expect(screen.getByText('Sarah Jenkins')).toBeInTheDocument()
    expect(screen.getByText('Staff Frontend Engineer')).toBeInTheDocument()
    expect(screen.getByText('Engineering')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()

    // Test select checkbox
    const selectCheckbox = screen.getByLabelText('Select Sarah Jenkins')
    fireEvent.click(selectCheckbox)
    expect(onToggleSelect).toHaveBeenCalledWith('1')

    // Test delete button
    const deleteBtn = screen.getByLabelText('Delete Sarah Jenkins')
    fireEvent.click(deleteBtn)
    expect(onDelete).toHaveBeenCalledWith('1')
  })
})
