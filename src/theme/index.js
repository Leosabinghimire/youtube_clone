import { alpha, createTheme } from "@mui/material";

export const NAVBAR_HEIGHT = 56;
export const SIDEBAR_WIDTH = 240;
export const SIDEBAR_WIDTH_COLLAPSED = 72;
export const ACCENT = "#ff0033";

const light = {
  background: { default: "#ffffff", paper: "#ffffff" },
  text: { primary: "#0f0f0f", secondary: "#606060" },
  divider: "#e5e5e5",
  outline: "#cccccc",
  chip: { main: "#f2f2f2", hover: "#e5e5e5", active: "#0f0f0f", activeText: "#ffffff" },
  skeleton: "#e9e9e9",
};

const dark = {
  background: { default: "#0f0f0f", paper: "#0f0f0f" },
  text: { primary: "#f1f1f1", secondary: "#aaaaaa" },
  divider: "#303030",
  outline: "#3f3f3f",
  chip: { main: "#272727", hover: "#3f3f3f", active: "#f1f1f1", activeText: "#0f0f0f" },
  skeleton: "#272727",
};

export function createAppTheme(mode) {
  const tokens = mode === "dark" ? dark : light;
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: { main: tokens.text.primary, contrastText: tokens.background.default },
      secondary: { main: ACCENT, contrastText: "#ffffff" },
      info: { main: isDark ? "#3ea6ff" : "#065fd4" },
      background: tokens.background,
      text: tokens.text,
      divider: tokens.divider,
      action: {
        hover: alpha(isDark ? "#ffffff" : "#000000", isDark ? 0.1 : 0.05),
        selected: alpha(isDark ? "#ffffff" : "#000000", isDark ? 0.15 : 0.08),
        active: tokens.text.primary,
      },
      chip: tokens.chip,
      outline: tokens.outline,
      skeleton: tokens.skeleton,
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: '"Roboto", system-ui, -apple-system, "Segoe UI", sans-serif',
      fontSize: 14,
      h1: { fontSize: 20, fontWeight: 600, lineHeight: "28px" },
      h2: { fontSize: 20, fontWeight: 600, lineHeight: "28px" },
      h3: { fontSize: 16, fontWeight: 600, lineHeight: "22px" },
      subtitle1: { fontSize: 16, fontWeight: 500, lineHeight: "22px" },
      subtitle2: { fontSize: 14, fontWeight: 500, lineHeight: "20px" },
      body1: { fontSize: 14, lineHeight: "20px" },
      body2: { fontSize: 12, lineHeight: "18px" },
      caption: { fontSize: 12, lineHeight: "18px" },
      button: { textTransform: "none", fontWeight: 500, fontSize: 14 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "::-webkit-scrollbar": { width: 10, height: 10 },
          "::-webkit-scrollbar-thumb": {
            background: isDark ? "#3f3f3f" : "#cccccc",
            borderRadius: 10,
            border: `2px solid ${tokens.background.default}`,
          },
          "a": { color: "inherit", textDecoration: "none" },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: "inherit" },
        styleOverrides: { root: { backgroundColor: tokens.background.paper, backgroundImage: "none" } },
      },
      MuiToolbar: {
        styleOverrides: { root: { minHeight: NAVBAR_HEIGHT, "@media (min-width:600px)": { minHeight: NAVBAR_HEIGHT } } },
      },
      MuiDrawer: {
        styleOverrides: { paper: { backgroundImage: "none", borderRight: 0 } },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 18, height: 36, paddingLeft: 16, paddingRight: 16, whiteSpace: "nowrap" },
          containedPrimary: { "&:hover": { backgroundColor: tokens.text.primary, opacity: 0.85 } },
        },
        variants: [
          {
            props: { variant: "tonal" },
            style: {
              backgroundColor: tokens.chip.main,
              color: tokens.text.primary,
              "&:hover": { backgroundColor: tokens.chip.hover },
            },
          },
        ],
      },
      MuiIconButton: {
        styleOverrides: { root: { color: tokens.text.primary } },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 8, height: 32, fontWeight: 500, fontSize: 14 },
          filled: {
            backgroundColor: tokens.chip.main,
            "&:hover": { backgroundColor: tokens.chip.hover },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            minHeight: 40,
            paddingTop: 0,
            paddingBottom: 0,
            "&.Mui-selected": { backgroundColor: alpha(isDark ? "#ffffff" : "#000000", isDark ? 0.1 : 0.05) },
          },
        },
      },
      MuiListItemIcon: { styleOverrides: { root: { minWidth: 44, color: "inherit" } } },
      MuiSkeleton: {
        defaultProps: { animation: "wave" },
        styleOverrides: { root: { backgroundColor: tokens.skeleton } },
      },
      MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
      MuiTooltip: { defaultProps: { arrow: true } },
    },
  });
}

/** sx helper: clamp text to `lines` lines with an ellipsis. */
export const lineClamp = (lines) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});
