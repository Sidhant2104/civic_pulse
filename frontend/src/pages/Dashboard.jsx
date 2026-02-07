import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = [
    {
      label: "Total Issues",
      value: 120,
      icon: <ReportProblemIcon fontSize="large" />,
      color: "#1976d2",
    },
    {
      label: "Pending",
      value: 45,
      icon: <PendingActionsIcon fontSize="large" />,
      color: "#ed6c02",
    },
    {
      label: "Resolved",
      value: 65,
      icon: <CheckCircleIcon fontSize="large" />,
      color: "#2e7d32",
    },
    {
      label: "Escalated",
      value: 10,
      icon: <WarningIcon fontSize="large" />,
      color: "#d32f2f",
    },
  ];

  return (
    <Box className="page-fade">
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
        sx={{ mb: 3 }}
        spacing={2}
      >
        <Box>
          <Typography variant="h4">Command Center</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Real-time monitoring of civic issues across departments
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button component={Link} to="/citizen" variant="contained">
            Report Issue
          </Button>
          <Button component={Link} to="/issues" variant="outlined">
            View Issues
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {stats.map((s, i) => (
          <Grid item xs={12} md={3} key={i}>
            <Card className="hover-lift">
              <CardContent>
                <Typography sx={{ color: s.color }}>{s.icon}</Typography>
                <Typography variant="h6">{s.label}</Typography>
                <Typography variant="h4">{s.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
