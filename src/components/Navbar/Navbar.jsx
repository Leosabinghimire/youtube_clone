import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppBar, Avatar, Badge, Box, IconButton, InputBase, Toolbar, Tooltip, styled } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import MicIcon from "@mui/icons-material/Mic";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import userProfile from "../../assets/user_profile.jpg";
import { useColorMode } from "../../context/ThemeContext";
import Logo from "../Logo/Logo";

const SearchField = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  height: 40,
  minWidth: 0,
  padding: "0 4px 0 16px",
  border: `1px solid ${theme.palette.outline}`,
  borderRight: 0,
  borderRadius: "20px 0 0 20px",
  backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#ffffff",
  transition: theme.transitions.create(["border-color", "box-shadow"], { duration: 150 }),
  "&:focus-within": {
    borderColor: theme.palette.info.main,
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
  },
}));

const SearchButton = styled(IconButton)(({ theme }) => ({
  width: 64,
  height: 40,
  flexShrink: 0,
  borderRadius: "0 20px 20px 0",
  border: `1px solid ${theme.palette.outline}`,
  backgroundColor: theme.palette.chip.main,
  "&:hover": { backgroundColor: theme.palette.chip.hover },
}));

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mode, toggleMode } = useColorMode();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [mobileSearch, setMobileSearch] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    if (mobileSearch) inputRef.current?.focus();
  }, [mobileSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    setMobileSearch(false);
  };

  const clearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const hideWhileSearching = mobileSearch ? { xs: "none", md: "flex" } : "flex";

  return (
    <AppBar position="fixed">
      <Toolbar disableGutters sx={{ px: { xs: 1, sm: 2 }, gap: 2, justifyContent: "space-between" }}>
        <Box sx={{ display: hideWhileSearching, alignItems: "center", gap: 0.5, flexShrink: 0 }}>
          <IconButton onClick={onMenuClick} aria-label="Toggle sidebar">
            <MenuIcon />
          </IconButton>
          <Logo />
        </Box>

        <Box
          component="form"
          role="search"
          onSubmit={handleSubmit}
          sx={{
            display: mobileSearch ? "flex" : { xs: "none", md: "flex" },
            alignItems: "center",
            flex: 1,
            minWidth: 0,
            maxWidth: mobileSearch ? "none" : 720,
            mx: "auto",
          }}
        >
          {mobileSearch && (
            <IconButton onClick={() => setMobileSearch(false)} aria-label="Close search" sx={{ mr: 0.5 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <SearchField>
            <InputBase
              inputRef={inputRef}
              type="search"
              placeholder="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              inputProps={{ "aria-label": "Search videos", autoComplete: "off" }}
              sx={{ flex: 1, minWidth: 0, fontSize: 16, "& input::-webkit-search-cancel-button": { display: "none" } }}
            />
            {query && (
              <IconButton size="small" onClick={clearQuery} aria-label="Clear search">
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </SearchField>
          <SearchButton type="submit" aria-label="Search">
            <SearchIcon />
          </SearchButton>
          <Tooltip title="Search with your voice">
            <IconButton
              aria-label="Search with your voice"
              sx={{
                ml: 1,
                bgcolor: "chip.main",
                "&:hover": { bgcolor: "chip.hover" },
                display: { xs: "none", md: "inline-flex" },
              }}
            >
              <MicIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: hideWhileSearching, alignItems: "center", gap: 0.25, flexShrink: 0 }}>
          <IconButton
            onClick={() => setMobileSearch(true)}
            aria-label="Open search"
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <SearchIcon />
          </IconButton>
          <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
            <IconButton onClick={toggleMode} aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Create">
            <IconButton aria-label="Create" sx={{ display: { xs: "none", md: "inline-flex" } }}>
              <VideoCallOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton aria-label="Notifications" sx={{ display: { xs: "none", md: "inline-flex" } }}>
              <Badge badgeContent="9+" color="secondary">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <IconButton aria-label="Account" sx={{ ml: 1, p: 0.5 }}>
            <Avatar src={userProfile} alt="You" sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
