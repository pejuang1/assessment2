import { configureStore } from '@reduxjs/toolkit'
import { memberDirectorySlice } from './slices/member-directory-slice'
import { dashboardMetricsSlice } from './slices/metrics-slice'
import { userProfileSlice } from './slices/user-profile-slice'

export function makeStore() {
  return configureStore({
    reducer: {
      memberDirectory: memberDirectorySlice.reducer,
      dashboardMetrics: dashboardMetricsSlice.reducer,
      userProfile: userProfileSlice.reducer,
    },
  })
}

export const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
