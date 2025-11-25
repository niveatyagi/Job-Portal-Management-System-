export interface JobHistoryItem {
  id: number | string;
  jobTitle: string;
  company?: string;
  applicants?: any[];
  experience?: string;
  jobType?: string;
  location?: string;
  about?: string;
  packageOffered?: number | string;
  postTime?: string;
  status: "APPLIED" | "INTERVIEWED" | "OFFERED" | "POSTED";
}
