import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";

/** YouTube Data API `videoCategoryId` values. `0` means "all categories". */
export const CATEGORIES = [
  { id: 0, label: "Home", chip: "All", Icon: HomeOutlinedIcon },
  { id: 20, label: "Gaming", Icon: SportsEsportsOutlinedIcon },
  { id: 2, label: "Automobiles", Icon: DirectionsCarOutlinedIcon },
  { id: 17, label: "Sports", Icon: EmojiEventsOutlinedIcon },
  { id: 24, label: "Entertainment", Icon: MovieOutlinedIcon },
  { id: 28, label: "Technology", Icon: MemoryOutlinedIcon },
  { id: 10, label: "Music", Icon: MusicNoteOutlinedIcon },
  { id: 22, label: "Blogs", Icon: ArticleOutlinedIcon },
  { id: 25, label: "News", Icon: NewspaperOutlinedIcon },
];

export const DEFAULT_CATEGORY = CATEGORIES[0];

export const getCategory = (id) => CATEGORIES.find((c) => c.id === Number(id)) ?? DEFAULT_CATEGORY;
