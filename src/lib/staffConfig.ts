import { UserRole } from './types';

export const STAFF_ROLES: readonly UserRole[] = ['admin', 'staff', 'developer', 'reviewer'];

export const STAFF_EMAILS: readonly string[] = [
  'skchanu007@gmail.com',
  'skchan007@gmail.com',
  'srihari628@gmail.com',
  'sriharicherukumalli1@gmail.com',
  'sriharibaby2004@gmail.com',
];

/** Returns true if an email matches an authorized Awyk staff member. */
export function isStaffEmail(email?: string | null): boolean {
  if (!email) return false;
  return STAFF_EMAILS.includes(email.trim().toLowerCase());
}

/** Returns true if either profile role or email allowlist grants staff access. */
export function isStaffOrAdminUser(role?: string | null, email?: string | null): boolean {
  if (role && STAFF_ROLES.includes(role as UserRole)) {
    return true;
  }
  return isStaffEmail(email);
}
