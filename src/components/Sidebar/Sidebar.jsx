import { Link as RouterLink, useLocation, useSearchParams } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { APP_NAME } from "../../config";
import { CATEGORIES } from "../../constants/categories";
import { SUBSCRIPTIONS } from "../../constants/subscriptions";
import { NAVBAR_HEIGHT, SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED } from "../../theme";
import Logo from "../Logo/Logo";
import { ChannelAvatar } from "../ui";

function SidebarItem({ to, icon, label, selected = false, collapsed = false, onClick }) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        component={RouterLink}
        to={to}
        selected={selected}
        onClick={onClick}
        aria-current={selected ? "page" : undefined}
        sx={
          collapsed
            ? {
                flexDirection: "column",
                justifyContent: "center",
                gap: 0.75,
                height: 74,
                px: 0,
                "&.Mui-selected": { bgcolor: "transparent" },
              }
            : { gap: 0 }
        }
      >
        <ListItemIcon sx={collapsed ? { minWidth: 0 } : undefined}>{icon}</ListItemIcon>
        {collapsed ? (
          <Typography sx={{ fontSize: 10, lineHeight: 1, fontWeight: selected ? 500 : 400 }}>{label}</Typography>
        ) : (
          <ListItemText primary={label} slotProps={{ primary: { noWrap: true, fontWeight: selected ? 500 : 400 } }} />
        )}
      </ListItemButton>
    </ListItem>
  );
}

/**
 * mode: "expanded" | "collapsed" | "drawer"
 * In drawer mode the sidebar overlays the page and is toggled with `open`.
 */
export default function Sidebar({ mode, open = false, onClose }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isDrawer = mode === "drawer";
  const collapsed = mode === "collapsed";
  const activeCategory = location.pathname === "/" ? Number(searchParams.get("c")) || 0 : null;
  const closeIfDrawer = isDrawer ? onClose : undefined;

  const content = (
    <>
      {isDrawer && (
        <Toolbar disableGutters sx={{ px: 0.5, gap: 0.5 }}>
          <IconButton onClick={onClose} aria-label="Close sidebar">
            <MenuIcon />
          </IconButton>
          <Logo />
        </Toolbar>
      )}

      <List sx={{ px: collapsed ? 0.5 : 1.5, py: 1 }}>
        {CATEGORIES.map(({ id, label, Icon }) => (
          <SidebarItem
            key={id}
            to={id ? `/?c=${id}` : "/"}
            icon={<Icon />}
            label={label}
            selected={activeCategory === id}
            collapsed={collapsed}
            onClick={closeIfDrawer}
          />
        ))}
      </List>

      {!collapsed && (
        <>
          <Divider />
          <List
            sx={{ px: 1.5, py: 1 }}
            subheader={
              <ListSubheader
                disableSticky
                sx={{ bgcolor: "transparent", px: 1.5, fontSize: 16, fontWeight: 500, color: "text.primary", lineHeight: "40px" }}
              >
                Subscriptions
              </ListSubheader>
            }
          >
            {SUBSCRIPTIONS.map(({ id, name, avatar }) => (
              <SidebarItem
                key={id}
                to={`/search?q=${encodeURIComponent(name)}`}
                icon={<ChannelAvatar src={avatar} name={name} size={24} />}
                label={name}
                onClick={closeIfDrawer}
              />
            ))}
          </List>
          <Divider />
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", px: 3, py: 2, lineHeight: 1.6 }}>
            &copy; {new Date().getFullYear()} {APP_NAME}. Built with React, Material UI and the YouTube Data API.
          </Typography>
        </>
      )}
    </>
  );

  if (isDrawer) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        slotProps={{ paper: { sx: { width: SIDEBAR_WIDTH } } }}
      >
        {content}
      </Drawer>
    );
  }

  const width = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        transition: (theme) => theme.transitions.create("width", { duration: 200 }),
        "& .MuiDrawer-paper": {
          width,
          top: NAVBAR_HEIGHT,
          height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
          overflowX: "hidden",
          scrollbarWidth: "thin",
          transition: (theme) => theme.transitions.create("width", { duration: 200 }),
        },
      }}
    >
      <Box component="nav" aria-label="Primary">
        {content}
      </Box>
    </Drawer>
  );
}
