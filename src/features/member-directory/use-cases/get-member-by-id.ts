import { Member } from '../domain/member'
import { MemberRepository } from './member-repository'

export class MemberNotFoundError extends Error {
  constructor(id: string) {
    super(`Member with ID "${id}" not found`)
    this.name = 'MemberNotFoundError'
  }
}

export async function getMemberById(
  repository: MemberRepository,
  id: string
): Promise<Member> {
  const member = await repository.getMemberById(id)
  if (!member) {
    throw new MemberNotFoundError(id)
  }
  return member
}
