import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { APP_NAME } from "../../config";
import { ACCENT } from "../../theme";

export default function Logo() {
  return (
    <Box
      component={RouterLink}
      to="/"
      aria-label={`${APP_NAME} home`}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        height: 40,
        px: 1,
        borderRadius: "8px",
        color: "text.primary",
      }}
    >
      <Box component="svg" width={30} height={21} viewBox="0 0 30 21" aria-hidden="true" sx={{ flexShrink: 0 }}>
        <rect width="30" height="21" rx="6" fill={ACCENT} />
        <path d="M12 5.5 20 10.5 12 15.5z" fill="#fff" />
      </Box>
      <Typography component="span" sx={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.6px", lineHeight: 1 }}>
        {APP_NAME}
      </Typography>
    </Box>
  );
}
