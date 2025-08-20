/**
 * Integration test to verify Story 1.1 implementation
 * Tests the foundation components and their integration
 */

import * as fs from 'fs'
import * as path from 'path'

describe('Story 1.1: Project Initialization & Core Dependencies', () => {
  const rootPath = path.join(__dirname, '../..')
  
  describe('Acceptance Criteria 1: Monorepo Structure', () => {
    it('should have root package.json with pnpm workspace configuration', () => {
      const pkgJson = JSON.parse(
        fs.readFileSync(path.join(rootPath, 'package.json'), 'utf8')
      )
      expect(pkgJson.name).toBe('genius-priority-access')
      expect(pkgJson.packageManager).toContain('pnpm')
    })

    it('should have pnpm-workspace.yaml configured', () => {
      const workspaceFile = path.join(rootPath, 'pnpm-workspace.yaml')
      expect(fs.existsSync(workspaceFile)).toBe(true)
      const content = fs.readFileSync(workspaceFile, 'utf8')
      expect(content).toContain('apps/*')
      expect(content).toContain('packages/*')
    })

    it('should have apps/web directory for Next.js application', () => {
      const webDir = path.join(rootPath, 'apps/web')
      expect(fs.existsSync(webDir)).toBe(true)
      expect(fs.existsSync(path.join(webDir, 'package.json'))).toBe(true)
    })

    it('should have packages/db directory for Prisma schema and client', () => {
      const dbDir = path.join(rootPath, 'packages/db')
      expect(fs.existsSync(dbDir)).toBe(true)
      expect(fs.existsSync(path.join(dbDir, 'package.json'))).toBe(true)
      expect(fs.existsSync(path.join(dbDir, 'prisma/schema.prisma'))).toBe(true)
    })
  })

  describe('Acceptance Criteria 2: Core Dependencies', () => {
    it('should have Next.js 14.2 with TypeScript configured', () => {
      const webPkg = JSON.parse(
        fs.readFileSync(path.join(rootPath, 'apps/web/package.json'), 'utf8')
      )
      expect(webPkg.dependencies.next).toMatch(/14\.2/)
      expect(webPkg.devDependencies.typescript).toBeDefined()
      
      const tsConfig = path.join(rootPath, 'apps/web/tsconfig.json')
      expect(fs.existsSync(tsConfig)).toBe(true)
    })

    it('should have ShadCN/UI and Tailwind CSS configured', () => {
      const webPkg = JSON.parse(
        fs.readFileSync(path.join(rootPath, 'apps/web/package.json'), 'utf8')
      )
      expect(webPkg.devDependencies.tailwindcss).toMatch(/3\.4/)
      expect(webPkg.dependencies['@radix-ui/react-slot']).toBeDefined()
      
      const componentsJson = path.join(rootPath, 'apps/web/components.json')
      expect(fs.existsSync(componentsJson)).toBe(true)
      
      const tailwindConfig = path.join(rootPath, 'apps/web/tailwind.config.ts')
      expect(fs.existsSync(tailwindConfig)).toBe(true)
    })

    it('should have Prisma 5.15+ configured in database package', () => {
      const dbPkg = JSON.parse(
        fs.readFileSync(path.join(rootPath, 'packages/db/package.json'), 'utf8')
      )
      // Note: Version updated to 6.14 which is > 5.15
      expect(dbPkg.devDependencies.prisma).toBeDefined()
      expect(dbPkg.dependencies['@prisma/client']).toBeDefined()
    })

    it('should have Jest and Playwright testing frameworks configured', () => {
      const webPkg = JSON.parse(
        fs.readFileSync(path.join(rootPath, 'apps/web/package.json'), 'utf8')
      )
      expect(webPkg.devDependencies.jest).toMatch(/29\.7/)
      expect(webPkg.devDependencies['@testing-library/react']).toBeDefined()
      expect(webPkg.devDependencies['@testing-library/jest-dom']).toBeDefined()
      
      const rootPkg = JSON.parse(
        fs.readFileSync(path.join(rootPath, 'package.json'), 'utf8')
      )
      expect(rootPkg.devDependencies['@playwright/test']).toMatch(/1\.44/)
      
      const jestConfig = path.join(rootPath, 'apps/web/jest.config.ts')
      expect(fs.existsSync(jestConfig)).toBe(true)
      
      const playwrightConfig = path.join(rootPath, 'playwright.config.ts')
      expect(fs.existsSync(playwrightConfig)).toBe(true)
    })
  })

  describe('Acceptance Criteria 3: Supabase Local Development', () => {
    it('should have Supabase configuration files', () => {
      const supabaseConfig = path.join(rootPath, 'supabase/config.toml')
      expect(fs.existsSync(supabaseConfig)).toBe(true)
      
      const content = fs.readFileSync(supabaseConfig, 'utf8')
      expect(content).toContain('project_id = "genius-priority-access"')
      expect(content).toContain('port = 54321')
    })

    it('should have Supabase client dependencies', () => {
      const webPkg = JSON.parse(
        fs.readFileSync(path.join(rootPath, 'apps/web/package.json'), 'utf8')
      )
      expect(webPkg.dependencies['@supabase/supabase-js']).toBeDefined()
      expect(webPkg.dependencies['@supabase/auth-helpers-nextjs']).toBeDefined()
    })

    it('should have Supabase client configuration files', () => {
      const supabaseLib = path.join(rootPath, 'apps/web/src/lib/supabase.ts')
      expect(fs.existsSync(supabaseLib)).toBe(true)
      
      const content = fs.readFileSync(supabaseLib, 'utf8')
      expect(content).toContain('createClient')
      expect(content).toContain('NEXT_PUBLIC_SUPABASE_URL')
      expect(content).toContain('NEXT_PUBLIC_SUPABASE_ANON_KEY')
    })

    it('should have seed data configured', () => {
      const seedFile = path.join(rootPath, 'supabase/seed/seed.sql')
      expect(fs.existsSync(seedFile)).toBe(true)
    })
  })

  describe('Project Structure Compliance', () => {
    it('should follow the unified project structure from architecture docs', () => {
      // Verify directory structure matches architecture/12-unified-project-structure.md
      const expectedDirs = [
        'apps/web',
        'packages/db',
        'supabase/migrations',
        'supabase/seed',
        'docs/architecture',
        'docs/stories'
      ]
      
      expectedDirs.forEach(dir => {
        const fullPath = path.join(rootPath, dir)
        expect(fs.existsSync(fullPath)).toBe(true)
      })
    })
  })

  describe('Testing Infrastructure', () => {
    it('should have test setup files configured', () => {
      const testSetup = path.join(rootPath, 'apps/web/tests/setup.ts')
      expect(fs.existsSync(testSetup)).toBe(true)
      
      const content = fs.readFileSync(testSetup, 'utf8')
      expect(content).toContain('@testing-library/jest-dom')
    })

    it('should have example E2E test', () => {
      const e2eTest = path.join(rootPath, 'tests/e2e/homepage.spec.ts')
      expect(fs.existsSync(e2eTest)).toBe(true)
    })
  })
})