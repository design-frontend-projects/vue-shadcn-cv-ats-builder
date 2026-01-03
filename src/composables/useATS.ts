import { computed } from "vue";
import { useCVStore } from "@/stores/cvStore";

export function useATS() {
  const cvStore = useCVStore();

  const cvText = computed(() => {
    const { cv } = cvStore;
    let text = `${cv.personalInfo.fullName} ${cv.personalInfo.email}\n`;

    cv.workExperiences.forEach((job) => {
      text += `${job.jobTitle} ${job.company} ${job.description}\n`;
    });

    cv.education.forEach((edu) => {
      text += `${edu.degree} ${edu.school} ${edu.field}\n`;
    });

    cv.skills.forEach((skill) => {
      text += `${skill}\n`;
    });

    cv.projects.forEach((project) => {
      text += `${project.name} ${project.description}\n`;
    });

    return text.toLowerCase();
  });

  function analyzeMatch(jobDescription: string) {
    if (!jobDescription) return null;

    const jd = jobDescription.toLowerCase();

    // Extract potential keywords from JD (simple split and filter)
    const keywords = jd.match(/\b(\w+)\b/g) || [];
    const uniqueKeywords = [...new Set(keywords)].filter((k) => k.length > 4); // basic filter for meaningful words

    const matchedKeywords: string[] = [];
    const missingKeywords: string[] = [];

    uniqueKeywords.forEach((word) => {
      if (cvText.value.includes(word)) {
        matchedKeywords.push(word);
      } else {
        missingKeywords.push(word);
      }
    });

    // Scoring logic
    const keywordScore =
      uniqueKeywords.length > 0
        ? Math.round((matchedKeywords.length / uniqueKeywords.length) * 100)
        : 0;

    // Formatting score (simulated)
    let formattingScore = 80;
    if (cvStore.cv.workExperiences.length > 0) formattingScore += 5;
    if (cvStore.cv.skills.length > 5) formattingScore += 5;
    if (formattingScore > 100) formattingScore = 100;

    const overallScore = Math.round(keywordScore * 0.7 + formattingScore * 0.3);

    return {
      overallScore,
      keywordScore,
      matchedKeywords: matchedKeywords.slice(0, 10),
      missingKeywords: missingKeywords.slice(0, 10),
      formattingScore,
      suggestions: [
        missingKeywords.length > 0
          ? `Consider adding keywords like: ${missingKeywords.slice(0, 3).join(", ")}`
          : "Great keyword alignment!",
        cvStore.cv.skills.length < 5
          ? "Add more skills to your profile."
          : "Good skill count.",
        cvStore.cv.workExperiences.length === 0
          ? "Add your work experience to improve your score."
          : "Work experience included.",
      ],
    };
  }

  return { analyzeMatch };
}
