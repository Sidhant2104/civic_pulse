import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const steps = ["Submitted", "Assigned", "In Progress", "Resolved"];

export default function TrackIssue() {
  const [searched, setSearched] = useState(false);

  return (
    <Box className="page-fade" sx={{ py: { xs: 6, md: 10 } }}>
      <Container>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h4">Track Issue</Typography>
            <Typography color="text.secondary">
              Enter your issue ID to view status updates and department assignment.
            </Typography>
          </Box>

          <Paper sx={{ p: { xs: 3, md: 4 } }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField label="Issue ID" fullWidth placeholder="CP-2048" />
              <Button variant="contained" onClick={() => setSearched(true)}>
                Track
              </Button>
            </Stack>

            {searched ? (
              <Box sx={{ mt: 4 }}>
                <Stack spacing={2}>
                  <Typography variant="h6">Issue CP-2048</Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label="Assigned to Roads Department" />
                    <Chip label="Priority: High" color="warning" />
                  </Stack>
                  <Stepper activeStep={2} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <Paper sx={{ p: 2 }} className="hover-lift">
                    <Typography variant="subtitle2">
                      Latest update - Today 10:24 AM
                    </Typography>
                    <Typography color="text.secondary">
                      Field inspection completed. Repairs scheduled for tomorrow.
                    </Typography>
                  </Paper>
                </Stack>
              </Box>
            ) : null}
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
