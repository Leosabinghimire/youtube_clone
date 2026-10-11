import { useSearchParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import VideoGrid from "../../components/VideoGrid/VideoGrid";
import { useAsync, useDocumentTitle } from "../../hooks";
import { searchVideos } from "../../services/youtube";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const { data, loading, error, reload } = useAsync(
    () => (query ? searchVideos(query) : Promise.resolve([])),
    [query]
  );

  useDocumentTitle(query);

  return (
    <Box sx={{ maxWidth: 1096, mx: "auto", p: { xs: 2, sm: 3 } }}>
      <Typography component="h1" variant="subtitle1" color="text.secondary" sx={{ mb: 2.5, fontWeight: 400 }}>
        {query ? (
          <>
            Results for{" "}
            <Typography component="strong" variant="subtitle1" color="text.primary">
              &ldquo;{query}&rdquo;
            </Typography>
          </>
        ) : (
          "Search"
        )}
      </Typography>
      <VideoGrid
        videos={data}
        loading={loading}
        error={error}
        onRetry={reload}
        variant="row"
        emptyTitle={query ? "No results found" : "Type something to search"}
        emptyMessage={query ? "Try different keywords or check your spelling." : undefined}
      />
    </Box>
  );
}
