import { Box, Typography } from "@mui/material";
import VideoGrid from "../VideoGrid/VideoGrid";

export default function RelatedVideos({ videos, loading, error, onRetry, excludeId }) {
  const list = (videos ?? []).filter((video) => video.id !== excludeId);

  return (
    <Box component="section" aria-label="Related videos">
      <Typography variant="h3" sx={{ mb: 1.5, mt: { xs: 1, lg: 0 } }}>
        Up next
      </Typography>
      <VideoGrid
        videos={list}
        loading={loading}
        error={error}
        onRetry={onRetry}
        variant="compact"
        emptyTitle="No related videos"
        sx={{ gap: 1 }}
      />
    </Box>
  );
}
