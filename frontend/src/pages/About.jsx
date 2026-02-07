import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import SectionHeader from "../components/SectionHeader";

export default function About() {
  const points = [
    {
      title: "Fragmented Reporting",
      copy: "Citizens often report issues through multiple channels, with limited visibility on what happens next.",
    },
    {
      title: "Unclear Accountability",
      copy: "Without a unified tracking system, departments struggle to meet response timelines consistently.",
    },
    {
      title: "Low Transparency",
      copy: "Residents rarely receive verified updates, creating distrust and repeated complaints.",
    },
  ];

  const solution = [
    "Single, trusted platform for reporting and tracking",
    "Automatic department assignment with service-level timers",
    "Time-bound escalation for unresolved issues",
    "Transparent status updates for every citizen",
  ];

  return (
    <Box className="page-fade" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <Stack spacing={6}>
          <SectionHeader
            title="About CivicPulse"
            subtitle="CivicPulse strengthens civic trust by creating a reliable, time-bound path from complaint to resolution."
          />

          <Grid container spacing={3}>
            {points.map((item) => (
              <Grid item xs={12} md={4} key={item.title}>
                <Paper sx={{ p: 3, height: "100%" }} className="hover-lift">
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography color="text.secondary">{item.copy}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Paper sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              How CivicPulse solves the gap
            </Typography>
            <Stack spacing={1}>
              {solution.map((text) => (
                <Typography key={text} color="text.secondary">
                  {text}
                </Typography>
              ))}
            </Stack>
          </Paper>

          <Box
            sx={{
              height: { xs: 200, md: 320 },
              borderRadius: 4,
              backgroundImage:
                "linear-gradient(120deg, rgba(15, 76, 92, 0.4), rgba(16, 42, 67, 0.2)), url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
