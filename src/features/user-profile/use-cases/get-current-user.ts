import { CurrentUser } from '../domain/user-profile'
import { UserProfileRepository } from './user-profile-repository'

export async function getCurrentUser(
  repository: UserProfileRepository
): Promise<CurrentUser> {
  return repository.getCurrentUser()
}
