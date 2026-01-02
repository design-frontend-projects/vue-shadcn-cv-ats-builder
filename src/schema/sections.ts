import { z } from "zod";

// Personal Info schema
export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  address: z.string().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
});

// Work Experience schema
export const workExperienceSchema = z.object({
  company: z.string().min(1),
  position: z.string().min(1),
  startDate: z.string().min(1), // ISO date string
  endDate: z.string().optional(),
  description: z.string().optional(),
});

// Education schema
export const educationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

// Skill schema
export const skillSchema = z.object({
  name: z.string().min(1),
  level: z.number().min(1).max(5).optional(),
});

// Project schema
export const projectSchema = z.object({
  name: z.string().min(1),
  link: z.string().url().optional(),
  description: z.string().optional(),
});

// Certification schema
export const certificationSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  date: z.string().optional(),
});

// Language schema
export const languageSchema = z.object({
  name: z.string().min(1),
  proficiency: z.string().optional(),
});

// Custom Section schema
export const customSectionSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
});

// Export a map for dynamic form generation
export const sectionSchemas = {
  personalInfo: personalInfoSchema,
  workExperience: workExperienceSchema,
  education: educationSchema,
  skill: skillSchema,
  project: projectSchema,
  certification: certificationSchema,
  language: languageSchema,
  customSection: customSectionSchema,
};
