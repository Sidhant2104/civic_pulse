import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import SiteFooter from "./SiteFooter";

export default function PublicLayout() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <PublicNavbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <SiteFooter />
    </Box>
  );
}
