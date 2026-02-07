import {
  Box,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

export default function Issues() {
  return (
    <Box className="page-fade">
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h4">Issue Management</Typography>
        <Typography color="text.secondary">
          Track active reports and coordinate department responses.
        </Typography>
      </Stack>

      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button variant="outlined">Export</Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Department</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>101</TableCell>
              <TableCell>Pothole</TableCell>
              <TableCell>
                <Chip label="Pending" color="warning" />
              </TableCell>
              <TableCell>Roads</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>204</TableCell>
              <TableCell>Streetlight</TableCell>
              <TableCell>
                <Chip label="In Progress" color="info" />
              </TableCell>
              <TableCell>Utilities</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>338</TableCell>
              <TableCell>Overflow</TableCell>
              <TableCell>
                <Chip label="Resolved" color="success" />
              </TableCell>
              <TableCell>Sanitation</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
