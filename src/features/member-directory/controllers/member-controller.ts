import { Member } from '../domain/member'
import {
  MemberRepository,
  CreateMemberInput,
  UpdateMemberInput,
} from '../use-cases/member-repository'
import { getMembers } from '../use-cases/get-members'
import { getMemberById } from '../use-cases/get-member-by-id'
import { createMember } from '../use-cases/create-member'
import { updateMember, deleteMember } from '../use-cases/update-delete-member'
import { InMemoryMemberRepository } from '../infrastructure/in-memory-member-repository'

// Default in-memory repository instance - NO registry file required
const defaultRepository: MemberRepository = new InMemoryMemberRepository()

export async function getMembersController(
  repository: MemberRepository = defaultRepository
): Promise<Member[]> {
  return getMembers(repository)
}

export async function getMemberByIdController(
  id: string,
  repository: MemberRepository = defaultRepository
): Promise<Member> {
  return getMemberById(repository, id)
}

export async function createMemberController(
  input: CreateMemberInput,
  repository: MemberRepository = defaultRepository
): Promise<Member> {
  return createMember(repository, input)
}

export async function updateMemberController(
  id: string,
  input: UpdateMemberInput,
  repository: MemberRepository = defaultRepository
): Promise<Member> {
  return updateMember(repository, id, input)
}

export async function deleteMemberController(
  id: string,
  repository: MemberRepository = defaultRepository
): Promise<boolean> {
  return deleteMember(repository, id)
}
