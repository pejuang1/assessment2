import { DirectoryMetrics } from '../domain/metrics'

export interface MetricsRepository {
  getDirectoryMetrics(): Promise<DirectoryMetrics>
}
