import { DEFAULT_REGION, YOUTUBE_API_BASE, YOUTUBE_API_KEY } from "../config";

const VIDEO_PARTS = "snippet,contentDetails,statistics";

export class ApiError extends Error {
  constructor(message, { status = 0, reason = "" } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.reason = reason;
  }
}

async function request(endpoint, params = {}) {
  if (!YOUTUBE_API_KEY) {
    throw new ApiError(
      "Missing YouTube API key. Add REACT_APP_YOUTUBE_API_KEY to your .env file and restart the dev server.",
      { reason: "missingKey" }
    );
  }

  const url = new URL(`${YOUTUBE_API_BASE}/${endpoint}`);
  Object.entries({ ...params, key: YOUTUBE_API_KEY }).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url);
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const apiError = body?.error ?? {};
    throw new ApiError(apiError.message || `Request failed with status ${response.status}`, {
      status: response.status,
      reason: apiError.errors?.[0]?.reason ?? "",
    });
  }

  return body;
}

export async function getPopularVideos({ categoryId, maxResults = 48 } = {}) {
  const data = await request("videos", {
    part: VIDEO_PARTS,
    chart: "mostPopular",
    regionCode: DEFAULT_REGION,
    maxResults,
    videoCategoryId: categoryId || undefined,
  });
  return data.items ?? [];
}

export async function getVideosByIds(ids) {
  if (!ids.length) return [];
  const data = await request("videos", { part: VIDEO_PARTS, id: ids.join(",") });
  return data.items ?? [];
}

export async function getVideo(videoId) {
  const [video] = await getVideosByIds([videoId]);
  return video ?? null;
}

export async function getChannel(channelId) {
  const data = await request("channels", { part: "snippet,statistics", id: channelId });
  return data.items?.[0] ?? null;
}

export async function getComments(videoId, { maxResults = 30 } = {}) {
  try {
    const data = await request("commentThreads", {
      part: "snippet",
      videoId,
      maxResults,
      order: "relevance",
      textFormat: "plainText",
    });
    return { items: data.items ?? [], disabled: false };
  } catch (error) {
    if (error instanceof ApiError && error.reason === "commentsDisabled") {
      return { items: [], disabled: true };
    }
    throw error;
  }
}

export async function searchVideos(query, { maxResults = 25 } = {}) {
  const data = await request("search", { part: "snippet", q: query, type: "video", maxResults });
  const ids = (data.items ?? []).map((item) => item.id?.videoId).filter(Boolean);
  return getVideosByIds(ids);
}
