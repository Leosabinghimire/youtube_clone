import { Box } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import VideoCard, { VideoCardSkeleton } from "../VideoCard/VideoCard";
import { ErrorState } from "../ui";

const SKELETON_IDS = Array.from({ length: 12 }, (_, i) => i);

const GRID_SX = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(auto-fill, minmax(300px, 1fr))",
    xl: "repeat(auto-fill, minmax(340px, 1fr))",
  },
  gap: { xs: "24px 0", sm: "40px 16px" },
  px: { xs: 0, sm: 3 },
  pt: { xs: 0, sm: 3 },
  pb: 3,
};

const LIST_SX = { display: "flex", flexDirection: "column", gap: 2 };

export default function VideoGrid({
  videos,
  loading = false,
  error = null,
  onRetry,
  variant = "grid",
  emptyTitle = "No videos found",
  emptyMessage,
  sx,
}) {
  const layoutSx = { ...(variant === "grid" ? GRID_SX : LIST_SX), ...sx };

  if (error) {
    return <ErrorState title="Couldn't load videos" message={error.message} onRetry={onRetry} />;
  }

  if (loading) {
    return (
      <Box sx={layoutSx} aria-busy="true" aria-label="Loading videos">
        {SKELETON_IDS.map((id) => (
          <VideoCardSkeleton key={id} variant={variant} />
        ))}
      </Box>
    );
  }

  if (!videos?.length) {
    return <ErrorState icon={SearchOffIcon} title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <Box sx={layoutSx}>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} variant={variant} />
      ))}
    </Box>
  );
}
