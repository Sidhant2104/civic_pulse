import { Paper, Stack, Typography } from "@mui/material";

export default function StatCard({ label, value }) {
  return (
    <Paper className="hover-lift" sx={{ p: 3 }}>
      <Stack spacing={1}>
        <Typography variant="h4">{value}</Typography>
        <Typography color="text.secondary">{label}</Typography>
      </Stack>
    </Paper>
  );
}
