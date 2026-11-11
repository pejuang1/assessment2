import { DirectoryMetrics } from '../domain/metrics'
import { MetricsRepository } from './metrics-repository'

export async function getDirectoryMetrics(
  repository: MetricsRepository
): Promise<DirectoryMetrics> {
  return repository.getDirectoryMetrics()
}
