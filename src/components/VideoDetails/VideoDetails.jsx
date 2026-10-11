import { useEffect, useState } from "react";
import { Box, Button, Link, Paper, Skeleton, Stack, Typography } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CheckIcon from "@mui/icons-material/Check";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { lineClamp } from "../../theme";
import { formatCount, formatDate, formatNumber, splitLinks } from "../../utils/format";
import { ChannelAvatar } from "../ui";

function Description({ text, views, publishedAt }) {
  const [expanded, setExpanded] = useState(false);
  const segments = splitLinks(text);

  return (
    <Paper
      elevation={0}
      onClick={() => !expanded && setExpanded(true)}
      sx={{
        mt: 2,
        p: 1.5,
        borderRadius: 1,
        bgcolor: "chip.main",
        cursor: expanded ? "default" : "pointer",
        transition: (theme) => theme.transitions.create("background-color", { duration: 150 }),
        ...(!expanded && { "&:hover": { bgcolor: "chip.hover" } }),
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {formatNumber(views)} views &middot; {formatDate(publishedAt)}
      </Typography>
      <Typography
        component="p"
        variant="body1"
        sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word", ...(!expanded && lineClamp(3)) }}
      >
        {segments.map(({ type, value }, index) =>
          type === "link" ? (
            <Link
              key={index}
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              color="info.main"
              underline="hover"
              onClick={(event) => event.stopPropagation()}
            >
              {value}
            </Link>
          ) : (
            <span key={index}>{value}</span>
          )
        )}
        {!text && (
          <Typography component="span" color="text.secondary">
            No description.
          </Typography>
        )}
      </Typography>
      <Button
        size="small"
        sx={{ mt: 1, ml: -1, height: 32, color: "text.primary" }}
        onClick={(event) => {
          event.stopPropagation();
          setExpanded((v) => !v);
        }}
      >
        {expanded ? "Show less" : "...more"}
      </Button>
    </Paper>
  );
}

const segmentButtonSx = { borderRadius: 0, bgcolor: "transparent", "&:hover": { bgcolor: "chip.hover" } };

export default function VideoDetails({ video, channel }) {
  const { snippet, statistics } = video;
  const [reaction, setReaction] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setReaction(null);
    setSubscribed(false);
    setCopied(false);
  }, [video.id]);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const likeCount = Number(statistics?.likeCount ?? 0) + (reaction === "like" ? 1 : 0);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: snippet.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
      }
    } catch {
      // User dismissed the share sheet or clipboard access was denied.
    }
  };

  return (
    <Box sx={{ mt: 1.5 }}>
      <Typography variant="h1" sx={{ fontSize: { xs: 18, sm: 20 }, lineHeight: { xs: "24px", sm: "28px" } }}>
        {snippet.title}
      </Typography>

      <Stack
        direction="row"
        sx={{ mt: 1.5, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px 16px" }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", minWidth: 0, width: { xs: "100%", sm: "auto" } }}>
          <ChannelAvatar src={channel?.snippet?.thumbnails?.default?.url} name={snippet.channelTitle} size={40} />
          <Box sx={{ minWidth: 0, maxWidth: 220, flex: { xs: 1, sm: "none" } }}>
            <Typography variant="subtitle1" noWrap>
              {snippet.channelTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {channel ? `${formatCount(channel.statistics?.subscriberCount)} subscribers` : " "}
            </Typography>
          </Box>
          <Button
            variant={subscribed ? "tonal" : "contained"}
            color="primary"
            startIcon={subscribed ? <CheckIcon /> : undefined}
            onClick={() => setSubscribed((v) => !v)}
            aria-pressed={subscribed}
            sx={{ ml: { xs: "auto", sm: 1.5 } }}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </Button>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            width: { xs: "100%", sm: "auto" },
            overflowX: { xs: "auto", sm: "visible" },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box role="group" aria-label="Rate this video" sx={{ display: "inline-flex", borderRadius: 18, overflow: "hidden", bgcolor: "chip.main", flexShrink: 0 }}>
            <Button
              variant="tonal"
              startIcon={reaction === "like" ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
              onClick={() => setReaction((r) => (r === "like" ? null : "like"))}
              aria-pressed={reaction === "like"}
              aria-label="Like"
              sx={segmentButtonSx}
            >
              {formatCount(likeCount)}
            </Button>
            <Button
              variant="tonal"
              onClick={() => setReaction((r) => (r === "dislike" ? null : "dislike"))}
              aria-pressed={reaction === "dislike"}
              aria-label="Dislike"
              sx={{ ...segmentButtonSx, minWidth: 0, px: 1.5, borderLeft: 1, borderColor: "divider" }}
            >
              {reaction === "dislike" ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
            </Button>
          </Box>
          <Button variant="tonal" startIcon={<ShareOutlinedIcon />} onClick={handleShare} sx={{ flexShrink: 0 }}>
            {copied ? "Link copied" : "Share"}
          </Button>
          <Button variant="tonal" startIcon={<BookmarkBorderIcon />} sx={{ flexShrink: 0 }}>
            Save
          </Button>
        </Stack>
      </Stack>

      <Description text={snippet.description} views={statistics?.viewCount} publishedAt={snippet.publishedAt} />
    </Box>
  );
}

export function VideoDetailsSkeleton() {
  return (
    <Box sx={{ mt: 1.5 }} aria-hidden="true">
      <Skeleton height={28} width="80%" />
      <Stack direction="row" sx={{ mt: 1.5, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box>
            <Skeleton height={22} width={140} />
            <Skeleton height={18} width={90} />
          </Box>
          <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: 18, ml: 1.5 }} />
        </Stack>
        <Stack direction="row" spacing={1}>
          <Skeleton variant="rounded" width={130} height={36} sx={{ borderRadius: 18 }} />
          <Skeleton variant="rounded" width={90} height={36} sx={{ borderRadius: 18 }} />
          <Skeleton variant="rounded" width={80} height={36} sx={{ borderRadius: 18 }} />
        </Stack>
      </Stack>
      <Skeleton variant="rounded" height={92} sx={{ mt: 2, borderRadius: 1 }} />
    </Box>
  );
}
