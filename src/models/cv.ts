export interface PersonalInfo {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  github?: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  location?: string;
  startDate: string; // ISO string
  endDate?: string; // ISO string or "Present"
  description: string;
  highlights?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Skill {
  name: string;
  level?: number; // 1‑5 scale
}

export interface Project {
  name: string;
  link?: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
}

export interface Language {
  name: string;
  proficiency?: string;
}

export interface CustomSection {
  title: string;
  content: string;
}

export interface CVData {
  templateId: string; // reference to selected template
  personalInfo: PersonalInfo;
  summary?: string;
  workExperiences: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  customSections: CustomSection[];
  // styling preferences
  theme?: {
    primaryColor?: string;
    fontFamily?: string;
  };
}
