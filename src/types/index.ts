export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: 'policy' | 'education' | 'social' | 'technology';
  status: 'active' | 'completed' | 'planned';
  date: string;
  imageUrl?: string;
}

export interface TeamMember {
  id: string;
  nameKey: string;
  roleKey: string;
  bioKey: string;
  imageUrl?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface NavLink {
  labelKey: string;
  href: string;
}

export interface FocusArea {
  titleKey: string;
  descriptionKey: string;
  icon: string;
}

export interface Value {
  titleKey: string;
  descriptionKey: string;
  icon: string;
}
