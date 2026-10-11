import { Link as RouterLink } from "react-router-dom";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { lineClamp } from "../../theme";
import { formatCount, formatDuration, isLive, timeAgo } from "../../utils/format";
import { ChannelAvatar } from "../ui";

const pickThumbnail = (thumbnails = {}) =>
  thumbnails.maxres?.url ?? thumbnails.standard?.url ?? thumbnails.high?.url ?? thumbnails.medium?.url ?? "";

/** Layout tokens per variant: "grid" (home feed) | "compact" (related list) | "row" (search results). */
const LAYOUT = {
  grid: {
    direction: "column",
    gap: 1.5,
    thumbWidth: "100%",
    thumbRadius: { xs: 0, sm: 1 },
    bodyPx: { xs: 2, sm: 0 },
  },
  compact: {
    direction: "row",
    gap: 1,
    thumbWidth: 168,
    thumbRadius: "8px",
    bodyPx: 0,
  },
  row: {
    direction: { xs: "column", sm: "row" },
    gap: { xs: 1.5, sm: 2 },
    thumbWidth: { xs: "100%", sm: "min(360px, 42%)" },
    thumbRadius: 1,
    bodyPx: 0,
  },
};

const rootSx = (layout) => ({
  display: "flex",
  flexDirection: layout.direction,
  gap: layout.gap,
  minWidth: 0,
  color: "text.primary",
});

const thumbSx = (layout) => ({
  position: "relative",
  flexShrink: 0,
  aspectRatio: "16 / 9",
  width: layout.thumbWidth,
  overflow: "hidden",
  borderRadius: layout.thumbRadius,
  bgcolor: "skeleton",
});

function DurationBadge({ video }) {
  const live = isLive(video);
  const duration = formatDuration(video.contentDetails?.duration);
  if (!live && !duration) return null;
  return (
    <Box
      sx={{
        position: "absolute",
        right: 8,
        bottom: 8,
        px: 0.5,
        py: "2px",
        borderRadius: "4px",
        bgcolor: live ? "secondary.main" : "rgba(0,0,0,0.8)",
        color: "#fff",
        fontSize: 12,
        fontWeight: live ? 700 : 500,
        lineHeight: "16px",
        letterSpacing: "0.3px",
      }}
    >
      {live ? "LIVE" : duration}
    </Box>
  );
}

export default function VideoCard({ video, variant = "grid" }) {
  const layout = LAYOUT[variant];
  const { id, snippet, statistics } = video;
  const isGrid = variant === "grid";
  const isRow = variant === "row";
  const metaVariant = isGrid ? "body1" : "body2";

  return (
    <Box
      component={RouterLink}
      to={`/watch/${id}`}
      sx={{ ...rootSx(layout), "&:hover .video-card__img": { transform: "scale(1.04)" } }}
    >
      <Box sx={thumbSx(layout)}>
        <Box
          component="img"
          className="video-card__img"
          src={pickThumbnail(snippet.thumbnails)}
          alt=""
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: (theme) => theme.transitions.create("transform", { duration: 350 }),
          }}
        />
        <DurationBadge video={video} />
      </Box>

      <Stack direction="row" spacing={1.5} sx={{ minWidth: 0, px: layout.bodyPx }}>
        {isGrid && <ChannelAvatar name={snippet.channelTitle} size={36} />}
        <Box sx={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography
            component="h3"
            variant={isGrid ? "subtitle1" : "subtitle2"}
            title={snippet.title}
            sx={{ ...lineClamp(2), ...(isRow && { fontSize: 18, lineHeight: "26px" }) }}
          >
            {snippet.title}
          </Typography>
          <Typography variant={metaVariant} color="text.secondary" noWrap sx={{ mt: 0.5, order: isRow ? 1 : 0 }}>
            {snippet.channelTitle}
          </Typography>
          <Typography variant={metaVariant} color="text.secondary" sx={{ mt: isRow ? 0.5 : 0 }}>
            {formatCount(statistics?.viewCount)} views &bull; {timeAgo(snippet.publishedAt)}
          </Typography>
          {isRow && snippet.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ ...lineClamp(2), mt: 1, order: 2, display: { xs: "none", sm: "-webkit-box" } }}
            >
              {snippet.description}
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export function VideoCardSkeleton({ variant = "grid" }) {
  const layout = LAYOUT[variant];
  return (
    <Box sx={rootSx(layout)} aria-hidden="true">
      <Skeleton variant="rounded" sx={{ ...thumbSx(layout), height: "auto" }} />
      <Stack direction="row" spacing={1.5} sx={{ flex: 1, minWidth: 0, px: layout.bodyPx }}>
        {variant === "grid" && <Skeleton variant="circular" width={36} height={36} sx={{ flexShrink: 0 }} />}
        <Box sx={{ flex: 1 }}>
          <Skeleton height={20} width="92%" />
          <Skeleton height={20} width="70%" />
          <Skeleton height={16} width="45%" />
        </Box>
      </Stack>
    </Box>
  );
}
