import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchAuthorityQueue } from "../data/mockApi";

export default function AuthorityDashboard() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchAuthorityQueue().then((data) => {
      if (!active) return;
      setQueue(data);
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
          <Typography variant="h4">Authority Dashboard</Typography>
          <Typography color="text.secondary">
            Manage assigned issues, update status, and close cases with evidence.
          </Typography>
        </Box>

        <Stack spacing={2}>
          {loading ? (
            <Paper sx={{ p: 3 }} className="shimmer">
              <Typography>Loading assigned issues...</Typography>
            </Paper>
          ) : (
            queue.map((issue) => (
              <Paper key={issue.id} sx={{ p: 3 }} className="hover-lift">
                <Stack spacing={1}>
                  <Typography variant="subtitle1">
                    {issue.type} · {issue.id}
                  </Typography>
                  <Typography color="text.secondary">
                    Location: {issue.location}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label={`Priority: ${issue.priority}`} />
                    <Chip label={`Status: ${issue.status}`} color="info" />
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button variant="outlined">Mark In Progress</Button>
                    <Button variant="contained">Resolve</Button>
                  </Stack>
                </Stack>
              </Paper>
            ))
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
