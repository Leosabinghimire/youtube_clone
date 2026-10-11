import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Comments from "../../components/Comments/Comments";
import RelatedVideos from "../../components/RelatedVideos/RelatedVideos";
import VideoDetails, { VideoDetailsSkeleton } from "../../components/VideoDetails/VideoDetails";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { ErrorState } from "../../components/ui";
import { useAsync, useDocumentTitle } from "../../hooks";
import { getChannel, getComments, getPopularVideos, getVideo } from "../../services/youtube";

export default function Watch() {
  const { videoId } = useParams();

  const video = useAsync(() => getVideo(videoId), [videoId]);
  const channelId = video.data?.snippet?.channelId;
  const categoryId = video.data?.snippet?.categoryId;

  const channel = useAsync(
    () => (channelId ? getChannel(channelId) : Promise.resolve(null)),
    [channelId]
  );
  const comments = useAsync(() => getComments(videoId), [videoId]);
  const related = useAsync(
    () => (categoryId ? getPopularVideos({ categoryId, maxResults: 25 }) : Promise.resolve([])),
    [categoryId]
  );

  useDocumentTitle(video.data?.snippet?.title);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [videoId]);

  if (video.error) {
    return <ErrorState title="Couldn't load this video" message={video.error.message} onRetry={video.reload} />;
  }

  if (!video.loading && !video.data) {
    return (
      <ErrorState
        title="Video not found"
        message="This video may have been removed, made private, or the link is wrong."
      />
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "minmax(0, 1fr) 402px" },
        gap: { xs: 2, lg: 3 },
        maxWidth: 1760,
        mx: "auto",
        p: { xs: 0, lg: 3 },
        pb: 3,
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <VideoPlayer videoId={videoId} title={video.data?.snippet?.title} />
        <Box sx={{ px: { xs: 2, lg: 0 } }}>
          {video.loading ? (
            <VideoDetailsSkeleton />
          ) : (
            <VideoDetails video={video.data} channel={channel.data} />
          )}
          <Comments {...comments} commentCount={video.data?.statistics?.commentCount} />
        </Box>
      </Box>

      <Box component="aside" sx={{ minWidth: 0, px: { xs: 2, lg: 0 } }}>
        <RelatedVideos
          videos={related.data}
          loading={video.loading || related.loading}
          error={related.error}
          onRetry={related.reload}
          excludeId={videoId}
        />
      </Box>
    </Box>
  );
}
