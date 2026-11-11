import { CurrentUser } from '../domain/user-profile'
import { UserProfileRepository } from '../use-cases/user-profile-repository'
import { getCurrentUser } from '../use-cases/get-current-user'
import { InMemoryUserProfileRepository } from '../infrastructure/in-memory-user-profile-repository'

const defaultRepository: UserProfileRepository = new InMemoryUserProfileRepository()

export async function getCurrentUserController(
  repository: UserProfileRepository = defaultRepository
): Promise<CurrentUser> {
  return getCurrentUser(repository)
}
