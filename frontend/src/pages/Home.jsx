import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import BoltIcon from "@mui/icons-material/Bolt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import InsightsIcon from "@mui/icons-material/Insights";
import GroupsIcon from "@mui/icons-material/Groups";
import { useEffect, useState } from "react";
import { fetchSummaryMetrics } from "../data/mockApi";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";

export default function Home() {
  const [stats, setStats] = useState({
    reported: 0,
    resolved: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchSummaryMetrics().then((data) => {
      if (!active) return;
      setStats(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const highlights = [
    {
      title: "Real-time Signal",
      copy: "Aggregate reports, social alerts, and department updates in one live map.",
      icon: <BoltIcon />,
    },
    {
      title: "Accountability",
      copy: "Track SLA performance and escalate with full audit trails.",
      icon: <VerifiedUserIcon />,
    },
    {
      title: "Actionable Insights",
      copy: "Prioritize resources with predictive trends and heatmaps.",
      icon: <InsightsIcon />,
    },
    {
      title: "Resident Engagement",
      copy: "Keep citizens informed with status updates and transparent timelines.",
      icon: <GroupsIcon />,
    },
  ];

  const steps = [
    {
      title: "Report",
      copy: "Submit an issue with location and optional images.",
    },
    {
      title: "Track",
      copy: "Monitor status updates and department actions.",
    },
    {
      title: "Resolve",
      copy: "Close the loop with verified completion updates.",
    },
  ];

  const testimonials = [
    {
      quote:
        "CivicPulse gives residents confidence that every complaint is tracked and resolved on time.",
      name: "City Operations Lead",
    },
    {
      quote:
        "Our response times improved once the platform introduced SLA-based escalation.",
      name: "Public Works Director",
    },
  ];

  const performance = [
    { label: "Issues Reported", value: stats.reported.toLocaleString() },
    { label: "Resolved", value: stats.resolved.toLocaleString() },
    { label: "Pending", value: stats.pending.toLocaleString() },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 10% 10%, #e9f2f5 0%, #f4f6f8 55%, #eef2f7 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 85% 15%, rgba(15, 76, 92, 0.15), transparent 45%)",
        }}
      />

      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          backgroundImage:
            "linear-gradient(120deg, rgba(15, 76, 92, 0.75), rgba(16, 42, 67, 0.6)), url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container sx={{ py: { xs: 10, md: 14 } }}>
          <Stack spacing={3} sx={{ maxWidth: 720 }} className="page-fade">
            <Chip
              label="CivicPulse Platform"
              sx={{ width: "fit-content", bgcolor: "rgba(255,255,255,0.2)", color: "#fff" }}
            />
            <Typography variant="h2" sx={{ color: "#fff" }}>
              CivicPulse - A Digital Platform for Transparent Citizen Issue Reporting and Resolution
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.85)" }}>
              A trusted civic system that lets citizens report issues, track progress,
              and ensures departments resolve them on time with full accountability.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                component={Link}
                to="/report"
                variant="contained"
                color="secondary"
                size="large"
              >
                Report an Issue
              </Button>
              <Button
                component={Link}
                to="/track"
                variant="outlined"
                color="inherit"
                size="large"
              >
                Track Complaint
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 8, md: 12 } }} className="page-fade">
        <Stack spacing={6}>
          <SectionHeader
            title="The CivicPulse Advantage"
            subtitle="From reporting to resolution, CivicPulse creates a transparent, time-bound workflow that keeps citizens informed and departments accountable."
          />

          <Grid container spacing={3}>
            {performance.map((stat) => (
              <Grid item xs={12} md={4} key={stat.label}>
                <StatCard
                  label={stat.label}
                  value={loading ? "..." : stat.value}
                />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            {highlights.map((item) => (
              <Grid item xs={12} md={6} key={item.title}>
                <Paper sx={{ p: 3, height: "100%" }} className="hover-lift">
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: "50%",
                        bgcolor: "rgba(15, 76, 92, 0.12)",
                        color: "primary.main",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography color="text.secondary">{item.copy}</Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Paper sx={{ p: { xs: 3, md: 4 } }} className="hover-lift">
            <SectionHeader
              title="How It Works"
              subtitle="A simple, accountable flow for every civic issue."
            />
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {steps.map((step, index) => (
                <Grid item xs={12} md={4} key={step.title}>
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      {index + 1}. {step.title}
                    </Typography>
                    <Typography color="text.secondary">{step.copy}</Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Grid container spacing={3}>
            {testimonials.map((item) => (
              <Grid item xs={12} md={6} key={item.name}>
                <Paper sx={{ p: 3 }} className="hover-lift">
                  <Typography sx={{ mb: 2 }}>&ldquo;{item.quote}&rdquo;</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Paper
            sx={{
              p: { xs: 3, md: 4 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
              gap: 3,
              alignItems: "center",
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h5">
                Built for transparency, performance, and public trust
              </Typography>
              <Typography color="text.secondary">
                CivicPulse delivers a clear record of every complaint, response time,
                and resolution outcome. Departments operate within service-level timelines,
                and citizens always know the status of their report.
              </Typography>
              <Button component={Link} to="/about" variant="contained">
                Learn about CivicPulse
              </Button>
            </Stack>
            <Box
              sx={{
                height: 200,
                borderRadius: 3,
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=1200&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
