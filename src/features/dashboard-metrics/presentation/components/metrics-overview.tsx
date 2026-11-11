import React from 'react'
import { Users, Zap, Building2, Mail } from 'lucide-react'
import { DirectoryMetrics } from '@/features/dashboard-metrics/domain/metrics'

interface MetricsOverviewProps {
  metrics: DirectoryMetrics | null
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metrics }) => {
  return (
    <section className="metrics-grid" aria-label="Directory metrics">
      <div className="metric-card">
        <div className="metric-card-top">
          <span className="metric-title">TOTAL MEMBERS</span>
          <div className="metric-icon-box purple">
            <Users size={16} />
          </div>
        </div>
        <div className="metric-value">{metrics?.totalMembers || 148}</div>
        <div className="metric-pill blue">{metrics?.totalMembersChange || '+12 this month'}</div>
      </div>

      <div className="metric-card">
        <div className="metric-card-top">
          <span className="metric-title">ACTIVE NOW</span>
          <div className="metric-icon-box blue">
            <Zap size={16} />
          </div>
        </div>
        <div className="metric-value">{metrics?.activeNow || 132}</div>
        <div className="metric-pill cyan">{metrics?.activeNowRate || '94% live activity'}</div>
      </div>

      <div className="metric-card">
        <div className="metric-card-top">
          <span className="metric-title">DEPARTMENTS</span>
          <div className="metric-icon-box slate">
            <Building2 size={16} />
          </div>
        </div>
        <div className="metric-value">{metrics?.departmentsCount || 8}</div>
        <div className="metric-pill gray">{metrics?.departmentsLabel || '8 active units'}</div>
      </div>

      <div className="metric-card">
        <div className="metric-card-top">
          <span className="metric-title">PENDING INVITES</span>
          <div className="metric-icon-box orange">
            <Mail size={16} />
          </div>
        </div>
        <div className="metric-value">{metrics?.pendingInvites || 5}</div>
        <div className="metric-pill amber">{metrics?.pendingInvitesLabel || '3 expiring soon'}</div>
      </div>
    </section>
  )
}
