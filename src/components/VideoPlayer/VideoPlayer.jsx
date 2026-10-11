import { Box } from "@mui/material";
import { NAVBAR_HEIGHT } from "../../theme";

export default function VideoPlayer({ videoId, title = "Video player" }) {
  return (
    <Box
      sx={{
        aspectRatio: "16 / 9",
        width: "100%",
        overflow: "hidden",
        bgcolor: "#000",
        borderRadius: { xs: 0, lg: 1 },
        position: { xs: "sticky", lg: "static" },
        top: NAVBAR_HEIGHT,
        zIndex: { xs: 3, lg: "auto" },
      }}
    >
      <Box
        component="iframe"
        key={videoId}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        sx={{ display: "block", width: "100%", height: "100%", border: 0 }}
      />
    </Box>
  );
}
