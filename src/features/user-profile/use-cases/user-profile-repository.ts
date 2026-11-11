import { CurrentUser } from '../domain/user-profile'

export interface UserProfileRepository {
  getCurrentUser(): Promise<CurrentUser>
}
