import { DirectoryMetrics } from '../domain/metrics'
import { MetricsRepository } from '../use-cases/metrics-repository'

export class InMemoryMetricsRepository implements MetricsRepository {
  async getDirectoryMetrics(): Promise<DirectoryMetrics> {
    return {
      totalMembers: 148,
      totalMembersChange: '+12 this month',
      activeNow: 132,
      activeNowRate: '94% live activity',
      departmentsCount: 8,
      departmentsLabel: '8 active units',
      pendingInvites: 5,
      pendingInvitesLabel: '3 expiring soon',
    }
  }
}
