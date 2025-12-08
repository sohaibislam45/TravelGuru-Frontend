import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App.jsx";
import "./index.css";

// Initialize theme from localStorage on app load
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  // Map "light" to "travelguru" for consistency with default theme
  const themeValue = savedTheme === "light" ? "travelguru" : savedTheme;
  document.documentElement.setAttribute("data-theme", themeValue);
} else {
  // Default to travelguru theme if no saved theme
  document.documentElement.setAttribute("data-theme", "travelguru");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
