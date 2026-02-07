import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";

const departments = [
  { name: "Roads", count: 312, status: "Operational" },
  { name: "Water", count: 198, status: "Operational" },
  { name: "Electricity", count: 156, status: "Monitoring" },
  { name: "Sanitation", count: 264, status: "Operational" },
  { name: "Parks", count: 88, status: "Monitoring" },
  { name: "Public Safety", count: 142, status: "Operational" },
];

export default function Departments() {
  return (
    <Box className="page-fade" sx={{ py: { xs: 6, md: 10 } }}>
      <Container>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h4">Departments</Typography>
            <Typography color="text.secondary">
              Issue volumes and operational status across city departments.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {departments.map((dept) => (
              <Grid item xs={12} md={4} key={dept.name}>
                <Paper sx={{ p: 3 }} className="hover-lift">
                  <Typography variant="h6">{dept.name}</Typography>
                  <Typography color="text.secondary">
                    Active issues: {dept.count}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Status: {dept.status}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
