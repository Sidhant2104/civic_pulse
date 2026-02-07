import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchAdminAnalytics } from "../data/mockApi";
import StatCard from "../components/StatCard";

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchAdminAnalytics().then((data) => {
      if (!active) return;
      setAnalytics(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <Container className="page-fade">
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4">Admin & Analytics</Typography>
          <Typography color="text.secondary">
            System-wide performance metrics and department accountability.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {["Total Issues", "Pending", "Resolved"].map((label) => (
            <Grid item xs={12} md={4} key={label}>
              <StatCard
                label={label}
                value={
                  loading
                    ? "..."
                    : label === "Total Issues"
                    ? analytics.total.toLocaleString()
                    : label === "Pending"
                    ? analytics.pending.toLocaleString()
                    : analytics.resolved.toLocaleString()
                }
              />
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Department Performance
          </Typography>
          <Stack spacing={2}>
            {loading ? (
              <Typography>Loading department metrics...</Typography>
            ) : (
              analytics.departments.map((dept) => (
                <Box key={dept.name}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography>{dept.name}</Typography>
                    <Typography color="text.secondary">
                      {dept.performance}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={dept.performance}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))
            )}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
