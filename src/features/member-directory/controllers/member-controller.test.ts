import { describe, it, expect } from 'vitest'
import {
  getMembersController,
  getMemberByIdController,
  createMemberController,
  updateMemberController,
  deleteMemberController,
} from './member-controller'
import { Member } from '../domain/member'
import { MemberRepository, CreateMemberInput, UpdateMemberInput } from '../use-cases/member-repository'

class MockRepo implements MemberRepository {
  private list: Member[] = [
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
      bioNotes: 'Lead engineer',
      avatarInitials: 'SJ',
    },
  ]

  async getMembers(): Promise<Member[]> {
    return this.list
  }
  async getMemberById(id: string): Promise<Member | null> {
    return this.list.find((m) => m.id === id) || null
  }
  async createMember(input: CreateMemberInput): Promise<Member> {
    const created: Member = {
      id: '2',
      code: '#MEM-2049',
      avatarInitials: 'MP',
      ...input,
    }
    this.list.push(created)
    return created
  }
  async updateMember(id: string, input: UpdateMemberInput): Promise<Member> {
    const idx = this.list.findIndex((m) => m.id === id)
    this.list[idx] = { ...this.list[idx], ...input }
    return this.list[idx]
  }
  async deleteMember(id: string): Promise<boolean> {
    const idx = this.list.findIndex((m) => m.id === id)
    if (idx === -1) return false
    this.list.splice(idx, 1)
    return true
  }
}

describe('Member Controller Direct DI (Without Registry)', () => {
  it('CTRL-01: should get members via controller injection', async () => {
    const mock = new MockRepo()
    const members = await getMembersController(mock)
    expect(members).toHaveLength(1)
    expect(members[0].fullName).toBe('Sarah Jenkins')
  })

  it('CTRL-02: should get member by id via controller', async () => {
    const mock = new MockRepo()
    const member = await getMemberByIdController('1', mock)
    expect(member.code).toBe('#MEM-2048')
  })

  it('CTRL-03: should create and delete member via controller', async () => {
    const mock = new MockRepo()
    const created = await createMemberController(
      {
        fullName: 'Michael Phelps',
        email: 'michael.phelps@acme.corp',
        roleTitle: 'Staff UI/UX Designer',
        department: 'Design',
        status: 'Active',
        accountStatusLabel: 'Active - Full Workspace Access',
        joinedDate: 'Nov 11, 2026',
        joinedMonthYear: 'November 2026',
        employmentType: 'Contract',
        bioNotes: 'Notes',
      },
      mock
    )
    expect(created.id).toBe('2')

    const delResult = await deleteMemberController('1', mock)
    expect(delResult).toBe(true)

    const members = await getMembersController(mock)
    expect(members).toHaveLength(1)
    expect(members[0].fullName).toBe('Michael Phelps')
  })
})
