import { Member } from '../domain/member'
import { CreateMemberInput, MemberRepository } from './member-repository'

export class InvalidMemberDataError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidMemberDataError'
  }
}

export async function createMember(
  repository: MemberRepository,
  input: CreateMemberInput
): Promise<Member> {
  if (!input.fullName.trim()) {
    throw new InvalidMemberDataError('Full Name is required')
  }
  if (!input.email.trim() || !input.email.includes('@')) {
    throw new InvalidMemberDataError('A valid Work Email is required')
  }
  if (!input.roleTitle.trim()) {
    throw new InvalidMemberDataError('Job Title is required')
  }

  return repository.createMember(input)
}
