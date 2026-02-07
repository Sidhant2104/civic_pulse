import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import StatCard from "../components/StatCard";

const insights = [
  { label: "Resolution Rate", value: "83%" },
  { label: "Avg. Response Time", value: "3.4 hrs" },
  { label: "Escalations This Month", value: "64" },
];

const chartBars = [72, 58, 86, 64, 78];

export default function Analytics() {
  return (
    <Box className="page-fade" sx={{ py: { xs: 6, md: 10 } }}>
      <Container>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h4">Analytics</Typography>
            <Typography color="text.secondary">
              System-wide insights, department performance, and resolution trends.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {insights.map((item) => (
              <Grid item xs={12} md={4} key={item.label}>
                <StatCard label={item.label} value={item.value} />
              </Grid>
            ))}
          </Grid>

          <Paper sx={{ p: 3 }} className="hover-lift">
            <Typography variant="h6" sx={{ mb: 2 }}>
              Department Performance
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 2,
                alignItems: "end",
                height: 180,
              }}
            >
              {chartBars.map((value, index) => (
                <Box
                  key={value}
                  sx={{
                    height: `${value}%`,
                    bgcolor: index % 2 ? "secondary.main" : "primary.main",
                    borderRadius: 2,
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "scaleY(1.04)" },
                  }}
                  title={`${value}%`}
                />
              ))}
            </Box>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
