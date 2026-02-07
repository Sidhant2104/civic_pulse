import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SectionHeader from "../components/SectionHeader";

export default function HowItWorks() {
  const steps = [
    {
      title: "Report Issue",
      copy: "Citizens submit issues with location and optional images.",
      icon: <ReportProblemIcon />,
    },
    {
      title: "Auto Assignment",
      copy: "CivicPulse routes the case to the correct department instantly.",
      icon: <AssignmentTurnedInIcon />,
    },
    {
      title: "Tracking",
      copy: "Progress is visible to both citizens and supervisors in real time.",
      icon: <TrackChangesIcon />,
    },
    {
      title: "Resolution",
      copy: "Departments mark completion with evidence and closure notes.",
      icon: <DoneAllIcon />,
    },
    {
      title: "Escalation",
      copy: "Overdue cases automatically escalate to leadership.",
      icon: <WarningAmberIcon />,
    },
  ];

  return (
    <Box className="page-fade" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <Stack spacing={6}>
          <SectionHeader
            title="How CivicPulse Works"
            subtitle="A structured, step-based flow that ensures every issue is tracked and resolved within defined timelines."
          />

          <Grid container spacing={3}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={6} key={step.title}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                  }}
                  className="hover-lift"
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "50%",
                      bgcolor: "rgba(15, 76, 92, 0.12)",
                      color: "primary.main",
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6">
                      {index + 1}. {step.title}
                    </Typography>
                    <Typography color="text.secondary">{step.copy}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
