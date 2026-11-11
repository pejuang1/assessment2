import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentUser } from '@/features/user-profile/domain/user-profile'

export interface UserProfileState {
  currentUser: CurrentUser | null
  loading: boolean
}

const initialState: UserProfileState = {
  currentUser: null,
  loading: false,
}

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<CurrentUser>) {
      state.currentUser = action.payload
      state.loading = false
    },
  },
})

export const { setCurrentUser } = userProfileSlice.actions
