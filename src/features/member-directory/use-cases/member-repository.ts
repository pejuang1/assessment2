import { Member } from '../domain/member'

export type CreateMemberInput = Omit<Member, 'id' | 'code' | 'avatarInitials'> & {
  code?: string
}

export type UpdateMemberInput = Partial<Omit<Member, 'id' | 'code' | 'avatarInitials'>>

export interface MemberRepository {
  getMembers(): Promise<Member[]>
  getMemberById(id: string): Promise<Member | null>
  createMember(input: CreateMemberInput): Promise<Member>
  updateMember(id: string, input: UpdateMemberInput): Promise<Member>
  deleteMember(id: string): Promise<boolean>
}
