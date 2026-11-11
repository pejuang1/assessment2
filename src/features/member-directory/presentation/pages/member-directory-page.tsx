'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { Download, Plus } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/composition/store/hooks'
import {
  setMembers,
  setLoading,
  setSearchQuery,
  toggleSelectMember,
  toggleSelectAll,
  deleteMemberSuccess,
  selectFilteredMembers,
} from '@/composition/store/slices/member-directory-slice'
import { setMetrics } from '@/composition/store/slices/metrics-slice'
import { setCurrentUser } from '@/composition/store/slices/user-profile-slice'
import {
  getMembersController,
  deleteMemberController,
} from '../../controllers/member-controller'
import { getDirectoryMetricsController } from '@/features/dashboard-metrics/controllers/metrics-controller'
import { getCurrentUserController } from '@/features/user-profile/controllers/user-profile-controller'
import { TopNavbar } from '@/shared/components/top-navbar'
import { MetricsOverview } from '@/features/dashboard-metrics/presentation/components/metrics-overview'
import { MemberFilterBar } from '../components/member-filter-bar'
import { MemberTable } from '../components/member-table'

export const MemberDirectoryPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const filteredMembers = useAppSelector(selectFilteredMembers)
  const { searchQuery, selectedMemberIds } = useAppSelector(
    (state) => state.memberDirectory
  )
  const metrics = useAppSelector((state) => state.dashboardMetrics.metrics)
  const currentUser = useAppSelector((state) => state.userProfile.currentUser)

  useEffect(() => {
    let alive = true
    dispatch(setLoading(true))

    Promise.all([
      getMembersController(),
      getDirectoryMetricsController(),
      getCurrentUserController(),
    ]).then(([membersData, metricsData, userData]) => {
      if (!alive) return
      dispatch(setMembers(membersData))
      dispatch(setMetrics(metricsData))
      dispatch(setCurrentUser(userData))
    })

    return () => {
      alive = false
    }
  }, [dispatch])

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      const ok = await deleteMemberController(id)
      if (ok) {
        dispatch(deleteMemberSuccess(id))
      }
    }
  }

  const handleExportCSV = () => {
    const headers = ['ID,Code,FullName,Email,Role,Department,Status,JoinedDate']
    const rows = filteredMembers.map(
      (m) =>
        `"${m.id}","${m.code}","${m.fullName}","${m.email}","${m.roleTitle}","${m.department}","${m.status}","${m.joinedDate}"`
    )
    const blob = new Blob([[...headers, ...rows].join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'members-directory.csv'
    a.click()
  }

  return (
    <>
      <TopNavbar user={currentUser} />
      <main className="main-content">
        <div className="directory-header">
          <div className="directory-title">
            <h1>Members Directory</h1>
            <p>
              Manage your organization team members, cross-functional roles, and workspace access
              levels.
            </p>
          </div>
          <div className="directory-actions">
            <button className="btn-secondary" onClick={handleExportCSV}>
              <Download size={15} /> Export CSV
            </button>
            <Link href="/members/new" className="btn-primary">
              <Plus size={16} /> Add Member
            </Link>
          </div>
        </div>

        <MetricsOverview metrics={metrics} />

        <MemberFilterBar
          searchQuery={searchQuery}
          onSearchChange={(q) => dispatch(setSearchQuery(q))}
        />

        <MemberTable
          members={filteredMembers}
          selectedIds={selectedMemberIds}
          onToggleSelect={(id) => dispatch(toggleSelectMember(id))}
          onToggleSelectAll={() =>
            dispatch(toggleSelectAll(filteredMembers.map((m) => m.id)))
          }
          onDelete={handleDelete}
        />
      </main>
    </>
  )
}
