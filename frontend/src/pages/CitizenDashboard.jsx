import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import { fetchCitizenIssues } from "../data/mockApi";

export default function CitizenDashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchCitizenIssues().then((data) => {
      if (!active) return;
      setIssues(data);
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
          <Typography variant="h4">Citizen Dashboard</Typography>
          <Typography color="text.secondary">
            Submit new issues and track current complaints in one place.
          </Typography>
        </Box>

        <Paper sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Report Issue
          </Typography>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Issue Type</InputLabel>
              <Select label="Issue Type" defaultValue="Pothole">
                <MenuItem value="Pothole">Pothole</MenuItem>
                <MenuItem value="Streetlight">Streetlight</MenuItem>
                <MenuItem value="Garbage Overflow">Garbage Overflow</MenuItem>
                <MenuItem value="Water Leakage">Water Leakage</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Location" fullWidth />
            <TextField label="Description" multiline rows={3} fullWidth />
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ width: "fit-content" }}
            >
              Upload Image (optional)
            </Button>
            <Button variant="contained">Submit Issue</Button>
          </Stack>
        </Paper>

        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            My Complaints
          </Typography>
          <Stack spacing={2}>
            {loading ? (
              <Paper sx={{ p: 3 }} className="shimmer">
                <Typography>Loading complaints...</Typography>
              </Paper>
            ) : (
              issues.map((issue) => (
                <Paper key={issue.id} sx={{ p: 3 }} className="hover-lift">
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">
                      {issue.type} · {issue.id}
                    </Typography>
                    <Typography color="text.secondary">
                      Status: {issue.status} · Updated {issue.updated}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={
                        issue.status === "Resolved"
                          ? 100
                          : issue.status === "In Progress"
                          ? 65
                          : 25
                      }
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Stack>
                </Paper>
              ))
            )}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
