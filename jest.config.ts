import path from 'path'
import getJestMappersFromTSConfig from 'tsconfig-paths-jest-mapper'
import type { Config } from 'jest'
const moduleNameMapper = getJestMappersFromTSConfig(
  path.resolve(__dirname, './tsconfig.paths.json')
)

const customJestConfig: Config = {
  rootDir: '.',
  testEnvironment: 'node',
  modulePaths: ['<rootdir>/src'],
  // setupFiles: ['<rootDir>/jest.setup.ts'],
  testRegex: ['(/src/.*(test|spec))\\.ts?$'],
  testTimeout: 80_000,
  moduleNameMapper: {
    ...moduleNameMapper,
  },
}

export default customJestConfig
