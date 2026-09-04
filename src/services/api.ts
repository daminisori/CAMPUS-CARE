// src/services/api.ts
// Centralized API layer connecting frontend to Node.js / Express REST API.
// The base URL is taken from VITE_API_BASE_URL (defaults to http://localhost:5000).

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL !== undefined ? import.meta.env.VITE_API_BASE_URL : '';

const TOKEN_STORAGE_KEY = 'campus_care_jwt_token';

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearAuthToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

/**
 * Generic helper to build full endpoint URLs.
 */
function endpoint(path: string): string {
  return `${API_BASE_URL}${path}`;
}

/**
 * Common headers with automatic Authorization bearer token injection.
 */
function getHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * POST /auth/login – authenticate a user and obtain a JWT token.
 */
export async function login(email: string, password: string, role: string): Promise<any> {
  const res = await fetch(endpoint('/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Login failed' }));
    throw new Error(err.message || 'Login failed');
  }
  const data = await res.json();
  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
}

/**
 * GET /users/me – fetch current authenticated user profile.
 */
export async function fetchUserProfile(): Promise<any> {
  const res = await fetch(endpoint('/users/me'), {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch user profile');
  return await res.json();
}

/**
 * GET /complaints – fetch the list of complaints for the current user/role with optional filters.
 */
export async function fetchComplaints(params?: { status?: string; department?: string; category?: string }): Promise<any> {
  const query = new URLSearchParams();
  if (params?.status && params.status !== 'all') query.append('status', params.status);
  if (params?.department && params.department !== 'all') query.append('department', params.department);
  if (params?.category && params.category !== 'all') query.append('category', params.category);

  const qs = query.toString();
  const res = await fetch(endpoint(`/complaints${qs ? `?${qs}` : ''}`), {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch complaints');
  return await res.json();
}

/**
 * GET /complaints/:id – fetch single complaint details.
 */
export async function fetchComplaintById(id: string): Promise<any> {
  const res = await fetch(endpoint(`/complaints/${id}`), {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch complaint details');
  return await res.json();
}

/**
 * POST /complaints – create a new complaint.
 */
export async function createComplaint(payload: any): Promise<any> {
  const res = await fetch(endpoint('/complaints'), {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Failed to create complaint' }));
    throw new Error(err.message || 'Failed to create complaint');
  }
  return await res.json();
}

/**
 * PATCH /complaints/:id – update status, assign staff, or add comments.
 */
export async function updateComplaint(id: string, payload: any): Promise<any> {
  const res = await fetch(endpoint(`/complaints/${id}`), {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Failed to update complaint' }));
    throw new Error(err.message || 'Failed to update complaint');
  }
  return await res.json();
}

/**
 * GET /departments – fetch list of departments.
 */
export async function fetchDepartments(): Promise<string[]> {
  const res = await fetch(endpoint('/departments'));
  if (!res.ok) throw new Error('Failed to fetch departments');
  return await res.json();
}

/**
 * GET /branches – fetch list of academic branches.
 */
export async function fetchBranches(): Promise<string[]> {
  const res = await fetch(endpoint('/branches'));
  if (!res.ok) throw new Error('Failed to fetch branches');
  return await res.json();
}

/**
 * GET /dashboard/stats – fetch dashboard statistics.
 */
export async function fetchDashboardStats(): Promise<any> {
  const res = await fetch(endpoint('/dashboard/stats'), {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch dashboard stats');
  return await res.json();
}

/**
 * GET /notifications – fetch system notifications.
 */
export async function fetchNotifications(): Promise<any> {
  const res = await fetch(endpoint('/notifications'), {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch notifications');
  return await res.json();
}

/**
 * POST /uploads – upload attachment photos.
 */
export async function uploadFiles(formData: FormData): Promise<{ urls: string[] }> {
  const token = getAuthToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(endpoint('/uploads'), {
    method: 'POST',
    headers,
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload file');
  return await res.json();
}
