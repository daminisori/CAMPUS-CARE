// src/services/api.ts
// Centralized API layer – replace mock/localStorage calls with real HTTP requests.
// The base URL is taken from an environment variable (VITE_API_BASE_URL).
// No actual implementation is provided; this file defines the expected signatures
// that the backend team can implement.

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

/**
 * Generic helper to build full endpoint URLs.
 */
function endpoint(path: string): string {
  return `${API_BASE_URL}${path}`;
}

/**
 * GET /complaints – fetch the list of complaints for the current user/role.
 */
export async function fetchComplaints(): Promise<any> {
  const res = await fetch(endpoint('/complaints'));
  if (!res.ok) throw new Error('Failed to fetch complaints');
  return await res.json();
}

/**
 * POST /complaints – create a new complaint.
 */
export async function createComplaint(payload: any): Promise<any> {
  const res = await fetch(endpoint('/complaints'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create complaint');
  return await res.json();
}

/**
 * PATCH /complaints/:id – update status, assign staff, or add comments.
 */
export async function updateComplaint(id: string, payload: any): Promise<any> {
  const res = await fetch(endpoint(`/complaints/${id}`), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update complaint');
  return await res.json();
}

/**
 * POST /auth/login – authenticate a user and obtain a JWT or session token.
 */
export async function login(email: string, password: string, role: string): Promise<any> {
  const res = await fetch(endpoint('/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json(); // Expected to contain token and user profile
}

/**
 * GET /departments – fetch list of departments/branches.
 */
export async function fetchDepartments(): Promise<any> {
  const res = await fetch(endpoint('/departments'));
  if (!res.ok) throw new Error('Failed to fetch departments');
  return await res.json();
}

/**
 * GET /branches – fetch list of academic branches.
 */
export async function fetchBranches(): Promise<any> {
  const res = await fetch(endpoint('/branches'));
  if (!res.ok) throw new Error('Failed to fetch branches');
  return await res.json();
}
