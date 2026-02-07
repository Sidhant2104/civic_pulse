import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReportIcon from "@mui/icons-material/Report";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { NavLink, useLocation } from "react-router-dom";

const drawerWidth = 220;

export default function Sidebar() {
  const location = useLocation();
  const navItems = [
    { label: "Home", icon: <HomeIcon />, to: "/" },
    { label: "About", icon: <InfoIcon />, to: "/about" },
    { label: "How It Works", icon: <ListAltIcon />, to: "/how-it-works" },
    { label: "Report", icon: <ReportIcon />, to: "/report" },
    { label: "Track", icon: <TrackChangesIcon />, to: "/track" },
    { label: "Departments", icon: <ListAltIcon />, to: "/departments" },
    { label: "Analytics", icon: <AdminPanelSettingsIcon />, to: "/analytics" },
    { label: "Dashboard", icon: <DashboardIcon />, to: "/dashboard" },
    { label: "Issues", icon: <ReportIcon />, to: "/issues" },
    { label: "Citizen", icon: <SupportAgentIcon />, to: "/citizen" },
    { label: "Authority", icon: <ReportIcon />, to: "/authority" },
    { label: "Admin", icon: <AdminPanelSettingsIcon />, to: "/admin" },
    { label: "Login", icon: <LoginIcon />, to: "/auth" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth },
      }}
    >
      <Stack spacing={0.5} sx={{ p: 2 }}>
        <Typography variant="h6">CivicPulse</Typography>
        <Typography variant="caption" color="text.secondary">
          Command Center
        </Typography>
      </Stack>

      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            selected={location.pathname === item.to}
            sx={{ borderRadius: 2, mx: 1, my: 0.5 }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
