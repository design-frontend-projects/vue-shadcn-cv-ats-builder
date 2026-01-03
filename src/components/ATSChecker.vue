<template>
  <div
    class="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
  >
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Left side: Input -->
      <div class="w-full md:w-1/3 space-y-4">
        <div
          class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Job Description
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Paste the job description here to analyze how well your CV matches
            the requirements.
          </p>
          <textarea
            v-model="jobDescription"
            class="w-full h-64 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Paste JD here..."
          ></textarea>
          <button
            @click="handleAnalyze"
            class="w-full mt-4 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <span>Analyze CV Match</span>
          </button>
        </div>
      </div>

      <!-- Right side: Results -->
      <div v-if="results" class="w-full md:w-2/3 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Overall Match Card -->
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center"
          >
            <h3
              class="text-lg font-semibold mb-4 text-gray-900 dark:text-white"
            >
              Overall Match
            </h3>
            <div class="relative w-48 h-48">
              <Doughnut :data="doughnutData" :options="doughnutOptions" />
              <div
                class="absolute inset-0 flex flex-col items-center justify-center"
              >
                <span class="text-4xl font-bold" :class="scoreColor"
                  >{{ results.overallScore }}%</span
                >
                <span class="text-xs text-gray-500 uppercase tracking-widest"
                  >Match Score</span
                >
              </div>
            </div>
          </div>

          <!-- Keyword Match Card -->
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3
              class="text-lg font-semibold mb-4 text-gray-900 dark:text-white"
            >
              Keyword Matching
            </h3>
            <div class="h-48">
              <Bar :data="barData" :options="barOptions" />
            </div>
          </div>
        </div>

        <!-- Details & Suggestions -->
        <div
          class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Improvement Suggestions
          </h3>
          <ul class="space-y-3">
            <li
              v-for="(suggestion, index) in results.suggestions"
              :key="index"
              class="flex items-start gap-3 text-sm"
            >
              <span
                class="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"
              ></span>
              <span class="text-gray-700 dark:text-gray-300">{{
                suggestion
              }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="w-full md:w-2/3 flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl"
      >
        <div
          class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-600 dark:text-gray-400">
          Ready for analysis
        </h3>
        <p class="text-sm text-gray-500 text-center max-w-xs">
          Enter a job description and click analyze to see how your CV stacks
          up.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useATS } from "@/composables/useATS";
import { Doughnut, Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

const { analyzeMatch } = useATS();

const jobDescription = ref("");
const results = ref<any>(null);

const handleAnalyze = () => {
  if (!jobDescription.value.trim()) return;
  results.value = analyzeMatch(jobDescription.value);
};

// Colors based on score
const scoreColor = computed(() => {
  if (!results.value) return "text-gray-400";
  if (results.value.overallScore >= 80) return "text-green-500";
  if (results.value.overallScore >= 60) return "text-yellow-500";
  return "text-red-500";
});

// Chart Data
const doughnutData = computed(() => ({
  datasets: [
    {
      data: [results.value.overallScore, 100 - results.value.overallScore],
      backgroundColor: [
        results.value.overallScore >= 80
          ? "#22c55e"
          : results.value.overallScore >= 60
            ? "#eab308"
            : "#ef4444",
        "#f3f4f6",
      ],
      borderWidth: 0,
      circumference: 360,
      rotation: 0,
      cutout: "80%",
    },
  ],
}));

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
};

const barData = computed(() => ({
  labels: ["Matched Keywords", "Missing (Major)"],
  datasets: [
    {
      label: "Count",
      data: [
        results.value.matchedKeywords.length,
        results.value.missingKeywords.length,
      ],
      backgroundColor: ["#3b82f6", "#ef4444"],
      borderRadius: 8,
    },
  ],
}));

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { y: { beginAtZero: true } },
  plugins: { legend: { display: false } },
};
</script>

<style scoped>
.bg-primary {
  background-color: #1a1a1a;
}
.dark .bg-primary {
  background-color: #3b82f6;
}
</style>
