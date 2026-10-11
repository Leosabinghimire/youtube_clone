import { createContext, useContext, useEffect, useMemo } from "react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { THEME_STORAGE_KEY } from "../config";
import { useLocalStorage } from "../hooks";
import { createAppTheme } from "../theme";

const ColorModeContext = createContext({ mode: "light", toggleMode: () => {} });

export function AppThemeProvider({ children }) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [stored, setStored] = useLocalStorage(THEME_STORAGE_KEY, null);
  const mode = stored ?? (prefersDark ? "dark" : "light");

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", mode === "dark" ? "#0f0f0f" : "#ffffff");
  }, [mode]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const value = useMemo(
    () => ({ mode, toggleMode: () => setStored(mode === "dark" ? "light" : "dark") }),
    [mode, setStored]
  );

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useColorMode = () => useContext(ColorModeContext);
