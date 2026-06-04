import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path: string) => readFileSync(path, 'utf8');

test('public header has no sign-in, sign-out, or saved-audit dashboard actions', () => {
  const header = read('components/Header.tsx');

  assert.equal(header.includes('href="/auth"'), false);
  assert.equal(header.includes('href="/dashboard"'), false);
  assert.equal(header.includes('useAuth'), false);
  assert.equal(header.includes('Sign In'), false);
  assert.equal(header.includes('Sign Out'), false);
});

test('auth page is admin-only and has no public account creation or user dashboard redirect', () => {
  const authPage = read('app/auth/page.tsx');

  assert.equal(authPage.includes('signUp'), false);
  assert.equal(authPage.includes('signInWithGoogle'), false);
  assert.equal(authPage.includes('Continue with Google'), false);
  assert.equal(authPage.includes('Sign Up'), false);
  assert.equal(authPage.includes("router.push('/dashboard')"), false);
  assert.equal(authPage.includes("router.replace('/')"), true);
});

test('user dashboard and public audit routes no longer read saved audits from Supabase', () => {
  const dashboardPage = read('app/dashboard/page.tsx');
  const auditPage = read('app/audit/[slug]/page.tsx');

  assert.equal(dashboardPage.includes('user_audit_codes'), false);
  assert.equal(dashboardPage.includes('audit_reports'), false);
  assert.equal(dashboardPage.includes("redirect('/llm-visibility-audit')"), true);
  assert.equal(auditPage.includes('audit_reports'), false);
  assert.equal(auditPage.includes('user_audit_codes'), false);
});

test('admin user management keeps login/users but removes saved-audit upload controls', () => {
  const adminUsersPage = read('app/admin/users/page.tsx');

  assert.equal(adminUsersPage.includes('audit_reports'), false);
  assert.equal(adminUsersPage.includes('paidAudits'), false);
  assert.equal(adminUsersPage.includes('Upload Paid Audit'), false);
  assert.equal(adminUsersPage.includes('auditFilter'), false);
});

test('middleware protects admin only and does not redirect public users to dashboard', () => {
  const middleware = read('middleware.ts');

  assert.equal(middleware.includes("'/dashboard'"), false);
  assert.equal(middleware.includes('/dashboard'), false);
  assert.equal(middleware.includes("matcher: ['/admin/:path*']"), true);
});
