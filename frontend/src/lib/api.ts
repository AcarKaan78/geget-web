import type { APIResponse, ContactFormData, Project, TeamMember } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<APIResponse<T>> {
  const res = await fetch(`${API_URL}/api/v1${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  return res.json();
}

export const api = {
  contact: {
    submit: (data: ContactFormData) =>
      fetchAPI('/contact', { method: 'POST', body: JSON.stringify(data) }),
  },
  projects: {
    list: () => fetchAPI<Project[]>('/projects'),
  },
  team: {
    list: () => fetchAPI<TeamMember[]>('/team'),
  },
};
