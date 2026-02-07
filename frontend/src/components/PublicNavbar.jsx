import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const linkSx = {
  color: "inherit",
  fontWeight: 500,
  textTransform: "none",
  "&.active": {
    color: "secondary.main",
  },
};

export default function PublicNavbar() {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(255, 255, 255, 0.85)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">CivicPulse</Typography>
        <Stack direction="row" spacing={2} sx={{ display: { xs: "none", md: "flex" } }}>
          <Button component={NavLink} to="/" sx={linkSx}>
            Home
          </Button>
          <Button component={NavLink} to="/report" sx={linkSx}>
            Report
          </Button>
          <Button component={NavLink} to="/track" sx={linkSx}>
            Track
          </Button>
          <Button component={NavLink} to="/about" sx={linkSx}>
            About
          </Button>
          <Button component={NavLink} to="/contact" sx={linkSx}>
            Contact
          </Button>
          <Button component={NavLink} to="/faq" sx={linkSx}>
            FAQ
          </Button>
        </Stack>
        <Box>
          <Button component={NavLink} to="/dashboard" variant="outlined" sx={{ mr: 1 }}>
            Dashboard
          </Button>
          <Button component={NavLink} to="/auth" variant="contained">
            Sign In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
