import { Box, Container, Divider, Stack, Typography } from "@mui/material";

export default function SiteFooter() {
  return (
    <Box sx={{ py: 4, borderTop: "1px solid rgba(15, 23, 42, 0.08)" }}>
      <Container>
        <Stack spacing={2}>
          <Typography variant="h6">CivicPulse</Typography>
          <Typography color="text.secondary">
            A transparent civic issue reporting and resolution platform built for trust,
            accountability, and faster city services.
          </Typography>
          <Divider />
          <Typography variant="caption" color="text.secondary">
            © 2026 CivicPulse. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
