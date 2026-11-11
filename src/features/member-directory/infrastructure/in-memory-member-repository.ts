import { Member, getInitials } from '../domain/member'
import {
  MemberRepository,
  CreateMemberInput,
  UpdateMemberInput,
} from '../use-cases/member-repository'
import { INITIAL_MEMBERS } from './mock-members'

export class InMemoryMemberRepository implements MemberRepository {
  private members: Member[] = []

  constructor(initial: Member[] = INITIAL_MEMBERS) {
    this.members = initial.map((m) => ({ ...m }))
  }

  async getMembers(): Promise<Member[]> {
    return this.members.map((m) => ({ ...m }))
  }

  async getMemberById(id: string): Promise<Member | null> {
    const member = this.members.find((m) => m.id === id)
    return member ? { ...member } : null
  }

  async createMember(input: CreateMemberInput): Promise<Member> {
    const id = String(Date.now())
    const nextCodeNum = 2048 + this.members.length
    const newMember: Member = {
      id,
      code: input.code || `#MEM-${nextCodeNum}`,
      avatarInitials: getInitials(input.fullName),
      repositoriesCount: 0,
      deploymentsCount: 0,
      ...input,
    }
    this.members.unshift(newMember)
    return { ...newMember }
  }

  async updateMember(id: string, input: UpdateMemberInput): Promise<Member> {
    const index = this.members.findIndex((m) => m.id === id)
    if (index === -1) {
      throw new Error(`Member with ID "${id}" not found`)
    }
    const current = this.members[index]
    const updated: Member = {
      ...current,
      ...input,
      avatarInitials: input.fullName ? getInitials(input.fullName) : current.avatarInitials,
    }
    this.members[index] = updated
    return { ...updated }
  }

  async deleteMember(id: string): Promise<boolean> {
    const index = this.members.findIndex((m) => m.id === id)
    if (index === -1) return false
    this.members.splice(index, 1)
    return true
  }
}
