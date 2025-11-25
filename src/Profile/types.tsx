// src/types.ts

export interface Experience {
  id?: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  working: boolean;
  description: string;
}

export interface Certification {
  id?: number;
  name: string;
  issuer: string;
  issueDate: string;
  certificateId: string;
}

export interface ProfileData {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  about: string;
  skills: string[];
  experience: Experience[];
  certifications: Certification[];
}
