import { CurrentUser } from '../domain/user-profile'
import { UserProfileRepository } from '../use-cases/user-profile-repository'

export class InMemoryUserProfileRepository implements UserProfileRepository {
  async getCurrentUser(): Promise<CurrentUser> {
    return {
      id: 'admin-1',
      name: 'Alex Vance',
      role: 'Lead Architect',
      avatarInitials: 'AV',
    }
  }
}
