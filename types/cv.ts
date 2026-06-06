export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  photo?: string; // Base64 or URL
  links: SocialLink[];
  dob?: string;
  pob?: string;
  gender?: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  school: string;
  degree: string;
  graduationDate: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface CVData {
  personal: PersonalInfo;
  work: WorkExperience[];
  education: Education[];
  skills: Skill[];
  interests?: string[];
}

export type TemplateId = 
  | 'template-1' 
  | 'template-2' 
  | 'template-3' 
  | 'template-4'
  | 'template-5'
  | 'template-6'
  | 'template-7'
  | 'template-8'
  | 'template-9';

export interface CVVersion {
  id: string;
  name: string;
  templateId: TemplateId;
  data: CVData;
  updatedAt: number;
}
