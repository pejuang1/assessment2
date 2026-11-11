import { describe, it, expect, beforeEach } from 'vitest'
import { Member } from '../domain/member'
import { MemberRepository, CreateMemberInput, UpdateMemberInput } from './member-repository'
import { getMembers } from './get-members'
import { getMemberById, MemberNotFoundError } from './get-member-by-id'
import { createMember, InvalidMemberDataError } from './create-member'
import { updateMember, deleteMember } from './update-delete-member'

class MockMemberRepository implements MemberRepository {
  private members: Member[] = []

  constructor(initial: Member[] = []) {
    this.members = [...initial]
  }

  async getMembers(): Promise<Member[]> {
    return [...this.members]
  }

  async getMemberById(id: string): Promise<Member | null> {
    const found = this.members.find((m) => m.id === id)
    return found ? { ...found } : null
  }

  async createMember(input: CreateMemberInput): Promise<Member> {
    const newMember: Member = {
      id: String(this.members.length + 1),
      code: `#MEM-20${50 + this.members.length}`,
      avatarInitials: input.fullName.slice(0, 2).toUpperCase(),
      ...input,
    }
    this.members.push(newMember)
    return newMember
  }

  async updateMember(id: string, input: UpdateMemberInput): Promise<Member> {
    const index = this.members.findIndex((m) => m.id === id)
    if (index === -1) throw new Error('Not found')
    this.members[index] = { ...this.members[index], ...input }
    return this.members[index]
  }

  async deleteMember(id: string): Promise<boolean> {
    const index = this.members.findIndex((m) => m.id === id)
    if (index === -1) return false
    this.members.splice(index, 1)
    return true
  }
}

describe('Member Directory Use Cases', () => {
  let repo: MockMemberRepository
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
    bioNotes: 'Frontend architecture lead',
    avatarInitials: 'SJ',
  }

  beforeEach(() => {
    repo = new MockMemberRepository([sampleMember])
  })

  it('UC-01: should return all members', async () => {
    const result = await getMembers(repo)
    expect(result).toHaveLength(1)
    expect(result[0].fullName).toBe('Sarah Jenkins')
  })

  it('UC-02: should find member by id and throw if not found', async () => {
    const found = await getMemberById(repo, '1')
    expect(found.code).toBe('#MEM-2048')

    await expect(getMemberById(repo, '999')).rejects.toThrowError(MemberNotFoundError)
  })

  it('UC-03: should validate input when creating a member', async () => {
    await expect(
      createMember(repo, {
        fullName: '',
        email: 'test@example.com',
        roleTitle: 'Engineer',
        department: 'Engineering',
        status: 'Active',
        accountStatusLabel: 'Active',
        joinedDate: 'Nov 11, 2026',
        joinedMonthYear: 'November 2026',
        employmentType: 'Full-time Permanent',
        bioNotes: '',
      })
    ).rejects.toThrowError(InvalidMemberDataError)

    const created = await createMember(repo, {
      fullName: 'Michael Phelps',
      email: 'michael.phelps@acme.corp',
      roleTitle: 'Staff UI/UX Designer',
      department: 'Design',
      status: 'Active',
      accountStatusLabel: 'Active - Full Workspace Access',
      joinedDate: 'Nov 11, 2026',
      joinedMonthYear: 'November 2026',
      employmentType: 'Contract',
      bioNotes: 'Mainly working on low fidelity design',
    })
    expect(created.id).toBeDefined()
    expect(created.fullName).toBe('Michael Phelps')
  })

  it('UC-04: should update and delete member', async () => {
    const updated = await updateMember(repo, '1', { roleTitle: 'Principal Engineer' })
    expect(updated.roleTitle).toBe('Principal Engineer')

    const deleted = await deleteMember(repo, '1')
    expect(deleted).toBe(true)

    const members = await getMembers(repo)
    expect(members).toHaveLength(0)
  })
})
