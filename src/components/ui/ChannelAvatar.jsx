import { Avatar } from "@mui/material";

const hueFromString = (value = "") => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) hash = (hash * 31 + value.charCodeAt(i)) % 360;
  return hash;
};

/** MUI Avatar that falls back to a colored initial when there is no image. */
export default function ChannelAvatar({ src, name = "", size = 36, sx }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <Avatar
      src={src || undefined}
      alt={name}
      slotProps={{ img: { loading: "lazy" } }}
      sx={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.42),
        fontWeight: 500,
        bgcolor: `hsl(${hueFromString(name)} 50% 45%)`,
        color: "#fff",
        flexShrink: 0,
        ...sx,
      }}
    >
      {initial}
    </Avatar>
  );
}
