import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          CivicPulse - Smart Civic Governance
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button component={Link} to="/auth" variant="text" color="inherit">
            Sign In
          </Button>
          <Button
            component={Link}
            to="/citizen"
            variant="contained"
            color="secondary"
          >
            Report Issue
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
