import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(135deg, rgba(15, 76, 92, 0.15), rgba(224, 159, 62, 0.1))",
      }}
    >
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Paper
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: { xs: 4, md: 6 }, bgcolor: "primary.main", color: "#fff" }}>
            <Stack spacing={3}>
              <Typography variant="h4">Welcome to CivicPulse</Typography>
              <Typography>
                Secure access for city leaders, department heads, and response
                teams. Monitor the health of every neighborhood in one view.
              </Typography>
              <Stack spacing={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  What you get
                </Typography>
                <Typography>Real-time dashboards</Typography>
                <Typography>Automated escalation workflows</Typography>
                <Typography>Unified communications</Typography>
              </Stack>
              <Button
                component={Link}
                to="/"
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.6)",
                  width: "fit-content",
                }}
              >
                Back to Home
              </Button>
            </Stack>
          </Box>

          <Box sx={{ p: { xs: 4, md: 6 } }}>
            <Stack spacing={3}>
              <Typography variant="h5">Sign in</Typography>
              <Typography color="text.secondary">
                Use your official credentials to access the command center.
              </Typography>
              <Stack spacing={2}>
                <TextField label="Work email" fullWidth />
                <TextField label="Password" type="password" fullWidth />
                <TextField label="Role" select defaultValue="Citizen">
                  <MenuItem value="Citizen">Citizen</MenuItem>
                  <MenuItem value="Department Officer">Department Officer</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </TextField>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Keep me signed in"
                />
                <Typography variant="body2" color="text.secondary">
                  Reset password
                </Typography>
              </Stack>
              <Button variant="contained" size="large">
                Continue
              </Button>
              <Typography variant="body2" color="text.secondary">
                Need access? Contact your department administrator.
              </Typography>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Create account
                </Typography>
                <Stack spacing={2}>
                  <TextField label="Full name" fullWidth />
                  <TextField label="Email address" fullWidth />
                  <TextField label="Phone number" fullWidth />
                  <TextField label="New password" type="password" fullWidth />
                  <TextField label="Role" select defaultValue="Citizen">
                    <MenuItem value="Citizen">Citizen</MenuItem>
                    <MenuItem value="Department Officer">Department Officer</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </TextField>
                </Stack>
                <Button sx={{ mt: 2 }} variant="outlined">
                  Register
                </Button>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
