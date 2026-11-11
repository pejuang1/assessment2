import { DirectoryMetrics } from '../domain/metrics'
import { MetricsRepository } from '../use-cases/metrics-repository'
import { getDirectoryMetrics } from '../use-cases/get-metrics'
import { InMemoryMetricsRepository } from '../infrastructure/in-memory-metrics-repository'

const defaultRepository: MetricsRepository = new InMemoryMetricsRepository()

export async function getDirectoryMetricsController(
  repository: MetricsRepository = defaultRepository
): Promise<DirectoryMetrics> {
  return getDirectoryMetrics(repository)
}
