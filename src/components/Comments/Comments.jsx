import { Box, Button, IconButton, List, ListItem, Skeleton, Stack, Typography } from "@mui/material";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { formatCount, formatNumber, timeAgo } from "../../utils/format";
import { ChannelAvatar, ErrorState } from "../ui";

const itemSx = { alignItems: "flex-start", gap: 2, px: 0, py: 0, mb: 2.5 };

function CommentItem({ thread }) {
  const comment = thread.snippet?.topLevelComment?.snippet;
  if (!comment) return null;
  const replies = thread.snippet?.totalReplyCount ?? 0;

  return (
    <ListItem sx={itemSx}>
      <ChannelAvatar src={comment.authorProfileImageUrl} name={comment.authorDisplayName} size={40} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
          <Typography variant="subtitle2" sx={{ fontSize: 13 }}>
            {comment.authorDisplayName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {timeAgo(comment.publishedAt)}
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ mt: 0.5, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {comment.textOriginal ?? comment.textDisplay}
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", mt: 0.5, ml: -1, color: "text.secondary" }}>
          <IconButton size="small" aria-label="Like comment">
            <ThumbUpOutlinedIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" sx={{ minWidth: 16 }}>
            {formatCount(comment.likeCount)}
          </Typography>
          <IconButton size="small" aria-label="Dislike comment">
            <ThumbDownOutlinedIcon fontSize="small" />
          </IconButton>
          <Button size="small" sx={{ height: 32, borderRadius: 16, color: "text.primary", px: 1.5 }}>
            Reply
          </Button>
        </Stack>
        {replies > 0 && (
          <Typography variant="subtitle2" color="info.main" sx={{ mt: 0.5 }}>
            {replies} {replies === 1 ? "reply" : "replies"}
          </Typography>
        )}
      </Box>
    </ListItem>
  );
}

const SKELETON_IDS = [0, 1, 2, 3, 4];

export default function Comments({ data, loading, error, reload, commentCount }) {
  const heading = commentCount !== undefined ? `${formatNumber(commentCount)} Comments` : "Comments";

  return (
    <Box component="section" aria-label="Comments" sx={{ mt: 3 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>
        {heading}
      </Typography>

      {loading && (
        <List disablePadding aria-busy="true">
          {SKELETON_IDS.map((id) => (
            <ListItem key={id} sx={itemSx} aria-hidden="true">
              <Skeleton variant="circular" width={40} height={40} sx={{ flexShrink: 0 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton height={18} width={160} />
                <Skeleton height={20} width="90%" />
                <Skeleton height={20} width="60%" />
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      {!loading && error && (
        <ErrorState compact title="Couldn't load comments" message={error.message} onRetry={reload} />
      )}

      {!loading && !error && data?.disabled && (
        <Typography color="text.secondary">Comments are turned off for this video.</Typography>
      )}

      {!loading && !error && !data?.disabled && data?.items?.length === 0 && (
        <Typography color="text.secondary">No comments yet.</Typography>
      )}

      {!loading && !error && data?.items?.length > 0 && (
        <List disablePadding>
          {data.items.map((thread) => (
            <CommentItem key={thread.id} thread={thread} />
          ))}
        </List>
      )}
    </Box>
  );
}
