
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: string;
  image: string;
  category: string;
  level: string;
  rating: number;
  type: 'Live' | 'Recorded';
  startDate?: string;
}

export interface Material {
  id: string;
  title: string;
  type: 'PDF' | 'Video';
  price: string;
  isFree: boolean;
  downloadUrl?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  type: 'Internship' | 'Full-time';
  location: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  type: 'Webinar' | 'Workshop';
  price: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  isError?: boolean;
}

export enum AppSection {
  HOME = 'home',
  COURSES = 'courses',
  MATERIALS = 'materials',
  JOBS = 'jobs',
  FREELANCE = 'freelance',
  WEBINARS = 'webinars',
  RESUME = 'resume',
  AI_LAB = 'ai_lab',
  LOGIN = 'login'
}

export type ImageSize = '1K' | '2K' | '4K';
