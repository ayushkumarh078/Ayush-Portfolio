import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BackgroundType = "Solid" | "Linear Gradient" | "Radial Gradient" | "Animated Gradient" | "Aurora" | "Glass" | "Mesh" | "Noise" | "Starfield" | "Minimal Grid" | "Abstract Waves";
export type MatrixCharSet = "Binary" | "Hexadecimal" | "Katakana" | "Programming" | "Python" | "Java" | "JavaScript" | "React" | "Docker" | "AWS" | "SQL" | "Random";
export type AmbientEffect = "None" | "Particles" | "Floating Dust" | "Stars" | "Fireflies" | "Rain" | "Snow" | "Mesh Motion" | "Matrix Rain";

export interface ThemeState {
  name: string;
  
  // Background Designer
  backgroundType: BackgroundType;
  bgColor: string;
  gradientColors: string[];
  gradientAngle: number;
  noiseAmount: number;
  blurAmount: number;
  
  // Global Colors
  textPrimary: string;
  textSecondary: string;
  primaryAccent: string;
  
  // Matrix Designer
  matrixEnabled: boolean;
  matrixColor: string;
  matrixDensity: number;
  matrixSpeed: number;
  matrixSize: number;
  matrixCharSet: MatrixCharSet;
  matrixGlow: number;
  
  // Ambient
  ambientEffect: AmbientEffect;
  
  // Advanced
  glassTransparency: number;
  borderGlow: number;
  roundedCorners: number;
}

export const defaultThemeState: ThemeState = {
  name: "Dark System",
  
  backgroundType: "Solid",
  bgColor: "#0a0a0a",
  gradientColors: ["#0a0a0a", "#171717"],
  gradientAngle: 135,
  noiseAmount: 20,
  blurAmount: 0,
  
  textPrimary: "#ededed",
  textSecondary: "#a1a1aa",
  primaryAccent: "#ffffff",
  
  matrixEnabled: true,
  matrixColor: "rgba(255, 255, 255, 0.8)",
  matrixDensity: 50,
  matrixSpeed: 1,
  matrixSize: 16,
  matrixCharSet: "Katakana",
  matrixGlow: 5,
  
  ambientEffect: "Matrix Rain",
  
  glassTransparency: 0.8,
  borderGlow: 0.15,
  roundedCorners: 16,
};

interface ThemeStoreData {
  currentTheme: ThemeState;
  livePreviewState: ThemeState | null; // Used when hovering in the studio
  history: ThemeState[]; // For undo/redo
  historyIndex: number;
  savedThemes: ThemeState[];
}

interface ThemeStoreActions {
  updateTheme: (updates: Partial<ThemeState>) => void;
  setLivePreview: (updates: Partial<ThemeState> | null) => void;
  undo: () => void;
  redo: () => void;
  saveTheme: (name: string) => void;
  loadTheme: (theme: ThemeState) => void;
  deleteSavedTheme: (name: string) => void;
}

export const useThemeStore = create<ThemeStoreData & ThemeStoreActions>()(
  persist(
    (set, get) => ({
      currentTheme: defaultThemeState,
      livePreviewState: null,
      history: [defaultThemeState],
      historyIndex: 0,
      savedThemes: [],

      updateTheme: (updates) => {
        set((state) => {
          const newTheme = { ...state.currentTheme, ...updates };
          // Trim future history if we're making a new change after undoing
          const newHistory = state.history.slice(0, state.historyIndex + 1);
          newHistory.push(newTheme);
          
          // Keep max 20 history states to save memory
          if (newHistory.length > 20) {
            newHistory.shift();
          }

          return {
            currentTheme: newTheme,
            history: newHistory,
            historyIndex: newHistory.length - 1,
            // Clear live preview when a real change is made
            livePreviewState: null,
          };
        });
      },

      setLivePreview: (updates) => {
        if (!updates) {
          set({ livePreviewState: null });
        } else {
          set((state) => ({
            livePreviewState: { ...state.currentTheme, ...updates }
          }));
        }
      },

      undo: () => {
        set((state) => {
          if (state.historyIndex > 0) {
            const newIndex = state.historyIndex - 1;
            return {
              historyIndex: newIndex,
              currentTheme: state.history[newIndex],
              livePreviewState: null,
            };
          }
          return state;
        });
      },

      redo: () => {
        set((state) => {
          if (state.historyIndex < state.history.length - 1) {
            const newIndex = state.historyIndex + 1;
            return {
              historyIndex: newIndex,
              currentTheme: state.history[newIndex],
              livePreviewState: null,
            };
          }
          return state;
        });
      },

      saveTheme: (name) => {
        set((state) => {
          const themeToSave = { ...state.currentTheme, name };
          const newSaved = [...state.savedThemes.filter(t => t.name !== name), themeToSave];
          return { savedThemes: newSaved };
        });
      },

      loadTheme: (theme) => {
        set((state) => {
          const newHistory = state.history.slice(0, state.historyIndex + 1);
          newHistory.push(theme);
          if (newHistory.length > 20) newHistory.shift();
          
          return {
            currentTheme: theme,
            history: newHistory,
            historyIndex: newHistory.length - 1,
            livePreviewState: null,
          };
        });
      },

      deleteSavedTheme: (name) => {
        set((state) => ({
          savedThemes: state.savedThemes.filter(t => t.name !== name)
        }));
      },
    }),
    {
      name: "advanced-theme-studio-storage",
      partialize: (state) => ({ 
        currentTheme: state.currentTheme, 
        savedThemes: state.savedThemes 
      }), // Only persist current theme and saved themes
    }
  )
);
