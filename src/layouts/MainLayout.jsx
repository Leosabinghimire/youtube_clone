import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { SIDEBAR_STORAGE_KEY } from "../config";
import { useLocalStorage } from "../hooks";
import { NAVBAR_HEIGHT } from "../theme";

export default function MainLayout() {
  const location = useLocation();
  const isNarrow = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [collapsed, setCollapsed] = useLocalStorage(SIDEBAR_STORAGE_KEY, false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // The watch page uses an overlay sidebar even on desktop so the player gets full width.
  const isWatch = location.pathname.startsWith("/watch");
  const sidebarMode = isNarrow || isWatch ? "drawer" : collapsed ? "collapsed" : "expanded";

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (sidebarMode !== "drawer") setDrawerOpen(false);
  }, [sidebarMode]);

  const toggleSidebar = useCallback(() => {
    if (sidebarMode === "drawer") setDrawerOpen((open) => !open);
    else setCollapsed((value) => !value);
  }, [sidebarMode, setCollapsed]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Navbar onMenuClick={toggleSidebar} />
      <Sidebar mode={sidebarMode} open={drawerOpen} onClose={closeDrawer} />
      <Box component="main" id="main" sx={{ flexGrow: 1, minWidth: 0, pt: `${NAVBAR_HEIGHT}px` }}>
        <Outlet />
      </Box>
    </Box>
  );
}
