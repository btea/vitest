import { toArray } from '@vitest/utils'
import type { VitestRunner, VitestRunnerConfig } from './types/runner'

export async function runSetupFiles(
  config: VitestRunnerConfig,
  runner: VitestRunner,
): Promise<void> {
  const files = toArray(config.setupFiles)
  if (config.sequence.setupFiles === 'parallel') {
    await Promise.all(
      files.map(async (fsPath) => {
        await runner.importFile(fsPath, 'setup')
      }),
    )
  }
  else {
    for (const fsPath of files) {
      await runner.importFile(fsPath, 'setup')
    }
  }
}
