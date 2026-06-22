export type ProjectCategory = 'policy' | 'education' | 'social' | 'technology';
export type ProjectStatus = 'active' | 'completed' | 'planned';

export interface LocalizedProjectContent {
  title: string;
  description: string;
}

export interface ProjectEntry {
  id: string;
  category: ProjectCategory;
  status: ProjectStatus;
  date: string; // YYYY-MM
  coverImage?: string;
  tr: LocalizedProjectContent;
  en?: LocalizedProjectContent;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectsManifest {
  version: 1;
  projects: ProjectEntry[];
}

export const EMPTY_PROJECTS_MANIFEST: ProjectsManifest = {
  version: 1,
  projects: [],
};

/** A project with its title/description resolved for one locale. */
export interface LocalizedProject {
  id: string;
  category: ProjectCategory;
  status: ProjectStatus;
  date: string;
  coverImage?: string;
  title: string;
  description: string;
}

/** Resolve a project for a locale, falling back to Turkish when English is absent. */
export function localizeProject(
  entry: ProjectEntry,
  locale: string,
): LocalizedProject {
  const useEn =
    locale === 'en' && entry.en && entry.en.title.trim().length > 0;
  const loc = useEn ? entry.en! : entry.tr;
  return {
    id: entry.id,
    category: entry.category,
    status: entry.status,
    date: entry.date,
    coverImage: entry.coverImage,
    title: loc.title,
    description: loc.description,
  };
}
