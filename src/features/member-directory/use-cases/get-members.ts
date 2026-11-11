import { Member } from '../domain/member'
import { MemberRepository } from './member-repository'

export async function getMembers(repository: MemberRepository): Promise<Member[]> {
  return repository.getMembers()
}
