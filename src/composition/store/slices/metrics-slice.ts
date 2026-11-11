import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DirectoryMetrics } from '@/features/dashboard-metrics/domain/metrics'

export interface DashboardMetricsState {
  metrics: DirectoryMetrics | null
  loading: boolean
  error: string | null
}

const initialState: DashboardMetricsState = {
  metrics: null,
  loading: false,
  error: null,
}

export const dashboardMetricsSlice = createSlice({
  name: 'dashboardMetrics',
  initialState,
  reducers: {
    setMetrics(state, action: PayloadAction<DirectoryMetrics>) {
      state.metrics = action.payload
      state.loading = false
      state.error = null
    },
    setMetricsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
  },
})

export const { setMetrics, setMetricsLoading } = dashboardMetricsSlice.actions
