import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { CVData } from "@/models/cv";

// Helper to load from localStorage
function loadFromStorage(): CVData | null {
  const raw = localStorage.getItem("cv-data");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CVData;
  } catch {
    return null;
  }
}

// Helper to save to localStorage
function saveToStorage(data: CVData) {
  localStorage.setItem("cv-data", JSON.stringify(data));
}

export const useCVStore = defineStore("cv", () => {
  // Initialise with stored data or defaults
  const cv = ref<CVData>(
    loadFromStorage() || {
      templateId: "default",
      personalInfo: { fullName: "", email: "" },
      workExperiences: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
      customSections: [],
    }
  );

  // Persist changes automatically
  watch(
    cv,
    (newVal) => {
      saveToStorage(newVal);
    },
    { deep: true }
  );

  // Mutations / actions
  function setTemplate(id: string) {
    cv.value.templateId = id;
  }

  function updatePersonalInfo(info: Partial<CVData["personalInfo"]>) {
    cv.value.personalInfo = { ...cv.value.personalInfo, ...info };
  }

  // Add more helpers as needed (e.g., addWorkExperience, removeSection, reorder, etc.)

  return { cv, setTemplate, updatePersonalInfo };
});
