import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { Member, MemberStatus, Department, filterMembers } from '@/features/member-directory/domain/member'

export interface MemberDirectoryState {
  members: Member[]
  loading: boolean
  error: string | null
  searchQuery: string
  statusFilter: MemberStatus | 'All'
  departmentFilter: Department | 'All'
  selectedMemberIds: string[]
}

const initialState: MemberDirectoryState = {
  members: [],
  loading: false,
  error: null,
  searchQuery: '',
  statusFilter: 'All',
  departmentFilter: 'All',
  selectedMemberIds: [],
}

export const memberDirectorySlice = createSlice({
  name: 'memberDirectory',
  initialState,
  reducers: {
    setMembers(state, action: PayloadAction<Member[]>) {
      state.members = action.payload
      state.loading = false
      state.error = null
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
      state.loading = false
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
    setStatusFilter(state, action: PayloadAction<MemberStatus | 'All'>) {
      state.statusFilter = action.payload
    },
    setDepartmentFilter(state, action: PayloadAction<Department | 'All'>) {
      state.departmentFilter = action.payload
    },
    toggleSelectMember(state, action: PayloadAction<string>) {
      const id = action.payload
      if (state.selectedMemberIds.includes(id)) {
        state.selectedMemberIds = state.selectedMemberIds.filter((item) => item !== id)
      } else {
        state.selectedMemberIds.push(id)
      }
    },
    toggleSelectAll(state, action: PayloadAction<string[]>) {
      const allIds = action.payload
      if (state.selectedMemberIds.length === allIds.length) {
        state.selectedMemberIds = []
      } else {
        state.selectedMemberIds = [...allIds]
      }
    },
    addMemberSuccess(state, action: PayloadAction<Member>) {
      state.members.unshift(action.payload)
    },
    updateMemberSuccess(state, action: PayloadAction<Member>) {
      const idx = state.members.findIndex((m) => m.id === action.payload.id)
      if (idx !== -1) {
        state.members[idx] = action.payload
      }
    },
    deleteMemberSuccess(state, action: PayloadAction<string>) {
      state.members = state.members.filter((m) => m.id !== action.payload)
      state.selectedMemberIds = state.selectedMemberIds.filter((id) => id !== action.payload)
    },
  },
})

export const {
  setMembers,
  setLoading,
  setError,
  setSearchQuery,
  setStatusFilter,
  setDepartmentFilter,
  toggleSelectMember,
  toggleSelectAll,
  addMemberSuccess,
  updateMemberSuccess,
  deleteMemberSuccess,
} = memberDirectorySlice.actions

export const selectMemberDirectory = (state: { memberDirectory: MemberDirectoryState }) =>
  state.memberDirectory

export const selectFilteredMembers = createSelector(
  [selectMemberDirectory],
  (state) =>
    filterMembers(state.members, {
      searchQuery: state.searchQuery,
      status: state.statusFilter,
      department: state.departmentFilter,
    })
)
