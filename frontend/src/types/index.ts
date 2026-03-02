export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'active' | 'completed' | 'upcoming';
  imageUrl: string;
  startDate: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export interface FocusArea {
  title: string;
  description: string;
  icon: string;
}

export interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}
