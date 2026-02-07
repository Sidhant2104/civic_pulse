import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

export default function IssueDetails() {
  const { id } = useParams();

  return (
    <Box className="page-fade" sx={{ py: { xs: 6, md: 10 } }}>
      <Container>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4">Issue Details</Typography>
            <Typography color="text.secondary">
              Full issue overview and status timeline.
            </Typography>
          </Box>

          <Paper sx={{ p: 3 }} className="hover-lift">
            <Stack spacing={2}>
              <Typography variant="h6">Issue ID: {id}</Typography>
              <Stack direction="row" spacing={1}>
                <Chip label="Department: Roads" />
                <Chip label="Priority: High" color="warning" />
              </Stack>
              <Typography color="text.secondary">
                Location: Sector 14, Ward 3 · Reported: Jan 12, 2026
              </Typography>
              <Typography>
                Description: Large pothole causing traffic disruption near the main
                intersection.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button variant="outlined" disabled>
                  Request Update
                </Button>
                <Button variant="contained" disabled>
                  Close Issue
                </Button>
              </Stack>
            </Stack>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Status Timeline
            </Typography>
            <Stack spacing={2}>
              {[
                "Created - Jan 12, 2026 09:24 AM",
                "Assigned to Roads - Jan 12, 2026 09:40 AM",
                "In Progress - Jan 12, 2026 02:10 PM",
                "Inspection Completed - Jan 13, 2026 10:00 AM",
              ].map((item) => (
                <Paper key={item} sx={{ p: 2 }} className="hover-lift">
                  <Typography>{item}</Typography>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
