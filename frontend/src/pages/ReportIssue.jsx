import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

const steps = ["Issue Details", "Location", "Upload"];

export default function ReportIssue() {
  const [activeStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  return (
    <Box className="page-fade" sx={{ py: { xs: 6, md: 10 } }}>
      <Container>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h4">Report an Issue</Typography>
            <Typography color="text.secondary">
              Submit a civic issue with details for quick assignment and resolution.
            </Typography>
          </Box>

          <Paper sx={{ p: { xs: 3, md: 4 } }}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category" defaultValue="Pothole">
                  <MenuItem value="Pothole">Pothole</MenuItem>
                  <MenuItem value="Streetlight">Streetlight</MenuItem>
                  <MenuItem value="Garbage Overflow">Garbage Overflow</MenuItem>
                  <MenuItem value="Water Leakage">Water Leakage</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Description" multiline rows={4} fullWidth />
              <TextField label="Location" fullWidth />
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ width: "fit-content" }}
              >
                Upload Image
              </Button>
              <Button
                variant="contained"
                onClick={() => setSubmitted(true)}
                size="large"
              >
                Submit Issue
              </Button>
            </Stack>

            {submitted ? (
              <Paper
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: "rgba(15, 76, 92, 0.08)",
                }}
                className="rise"
              >
                <Typography variant="subtitle1">
                  Issue submitted successfully.
                </Typography>
                <Typography color="text.secondary">
                  Tracking ID: CP-2048. You will receive updates shortly.
                </Typography>
              </Paper>
            ) : null}
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
