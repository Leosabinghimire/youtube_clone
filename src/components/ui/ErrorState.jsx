import { Box, Button, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  icon: IconComponent = ErrorOutlineIcon,
  compact = false,
  children,
}) {
  return (
    <Box
      role="alert"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: compact ? "flex-start" : "center",
        justifyContent: "center",
        textAlign: compact ? "left" : "center",
        gap: 1.5,
        py: compact ? 3 : 8,
        px: compact ? 0 : 3,
        color: "text.secondary",
      }}
    >
      <IconComponent sx={{ fontSize: compact ? 32 : 48 }} />
      <Typography variant={compact ? "subtitle2" : "h3"} fontWeight={500} color="text.primary">
        {title}
      </Typography>
      {message && (
        <Typography variant="body1" sx={{ maxWidth: 520, wordBreak: "break-word" }}>
          {message}
        </Typography>
      )}
      {children}
      {onRetry && (
        <Button variant="contained" color="primary" startIcon={<RefreshIcon />} onClick={onRetry} sx={{ mt: 1 }}>
          Try again
        </Button>
      )}
    </Box>
  );
}
