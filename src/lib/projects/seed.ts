import { projects as staticProjects } from '@/lib/projects';
import trMessages from '@/messages/tr.json';
import enMessages from '@/messages/en.json';
import type {
  ProjectsManifest,
  ProjectEntry,
  LocalizedProjectContent,
} from './types';

function getByPath(obj: unknown, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === 'object'
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      obj,
    );
}

function resolve(
  messages: unknown,
  titleKey: string,
  descriptionKey: string,
): LocalizedProjectContent | undefined {
  const title = getByPath(messages, titleKey);
  if (typeof title !== 'string') return undefined;
  const description = getByPath(messages, descriptionKey);
  return {
    title,
    description: typeof description === 'string' ? description : '',
  };
}

/**
 * Builds the initial manifest from the original static projects so the public
 * page keeps working before anything is persisted to Blob. The first admin write
 * persists this snapshot to `projects/manifest.json`.
 */
export function buildSeedManifest(): ProjectsManifest {
  const projects: ProjectEntry[] = staticProjects.map((p) => {
    const tr = resolve(trMessages, p.titleKey, p.descriptionKey) ?? {
      title: p.id,
      description: '',
    };
    const en = resolve(enMessages, p.titleKey, p.descriptionKey);
    const ts = `${p.date}-01T00:00:00.000Z`;
    return {
      id: p.id,
      category: p.category,
      status: p.status,
      date: p.date,
      tr,
      en,
      createdAt: ts,
      updatedAt: ts,
    };
  });
  return { version: 1, projects };
}
