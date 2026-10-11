const trimZero = (value) => value.toFixed(1).replace(/\.0$/, "");

export function formatCount(value) {
  const n = Number(value) || 0;
  if (n >= 1e9) return `${trimZero(n / 1e9)}B`;
  if (n >= 1e6) return `${trimZero(n / 1e6)}M`;
  if (n >= 1e3) return `${trimZero(n / 1e3)}K`;
  return String(n);
}

export function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(Number(value) || 0);
}

export function formatDate(isoString) {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const TIME_UNITS = [
  { unit: "year", seconds: 31536000 },
  { unit: "month", seconds: 2592000 },
  { unit: "week", seconds: 604800 },
  { unit: "day", seconds: 86400 },
  { unit: "hour", seconds: 3600 },
  { unit: "minute", seconds: 60 },
];

export function timeAgo(isoString) {
  if (!isoString) return "";
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(isoString).getTime()) / 1000));
  for (const { unit, seconds: unitSeconds } of TIME_UNITS) {
    const count = Math.floor(seconds / unitSeconds);
    if (count >= 1) return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
  }
  return "Just now";
}

export function formatDuration(isoDuration) {
  const match = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(isoDuration ?? "");
  if (!match) return "";
  const [h, m, s] = match.slice(1).map((part) => Number(part ?? 0));
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

export function isLive(video) {
  return video?.snippet?.liveBroadcastContent === "live";
}

const URL_PATTERN = /(https?:\/\/[^\s<]+)/g;

/** Splits text into plain and link segments so URLs can be rendered as anchors without innerHTML. */
export function splitLinks(text = "") {
  return text
    .split(URL_PATTERN)
    .map((value, index) => ({ type: index % 2 === 1 ? "link" : "text", value }));
}
