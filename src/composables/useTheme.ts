import { ref, onMounted } from "vue";

export function useTheme() {
  const isDark = ref(false);

  // Initialize theme based on storage or system preference
  const initTheme = () => {
    const cachedTheme = localStorage.getItem("theme");
    if (
      cachedTheme === "dark" ||
      (!cachedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      isDark.value = true;
      document.documentElement.classList.add("dark");
    } else {
      isDark.value = false;
      document.documentElement.classList.remove("dark");
    }
  };

  // Toggle theme and persist to localStorage
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  onMounted(() => {
    initTheme();
  });

  return {
    isDark,
    toggleTheme,
  };
}
