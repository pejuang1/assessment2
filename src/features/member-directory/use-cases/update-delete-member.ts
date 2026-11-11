import { Member } from '../domain/member'
import { MemberRepository, UpdateMemberInput } from './member-repository'
import { MemberNotFoundError } from './get-member-by-id'

export async function updateMember(
  repository: MemberRepository,
  id: string,
  input: UpdateMemberInput
): Promise<Member> {
  const existing = await repository.getMemberById(id)
  if (!existing) {
    throw new MemberNotFoundError(id)
  }
  return repository.updateMember(id, input)
}

export async function deleteMember(
  repository: MemberRepository,
  id: string
): Promise<boolean> {
  const existing = await repository.getMemberById(id)
  if (!existing) {
    throw new MemberNotFoundError(id)
  }
  return repository.deleteMember(id)
}
