export type ReportType = 'pdf' | 'image';

export interface ReportEntry {
  id: string;
  slug: string;
  titleTr: string;
  titleEn?: string;
  type: ReportType;
  fileUrl: string;
  fileName: string;
  sizeBytes: number;
  uploadedAt: string;
}

export interface ReportsManifest {
  version: 1;
  reports: ReportEntry[];
}

export const EMPTY_MANIFEST: ReportsManifest = {
  version: 1,
  reports: [],
};
