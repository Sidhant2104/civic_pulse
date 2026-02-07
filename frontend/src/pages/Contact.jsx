import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function Contact() {
  return (
    <Box className="page-fade" sx={{ py: { xs: 6, md: 10 } }}>
      <Container>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h4">Contact CivicPulse</Typography>
            <Typography color="text.secondary">
              Reach out to the civic operations team for support or partnerships.
            </Typography>
          </Box>

          <Paper
            sx={{
              p: { xs: 3, md: 4 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
              gap: 3,
            }}
          >
            <Stack spacing={2}>
              <TextField label="Full name" fullWidth />
              <TextField label="Email address" fullWidth />
              <TextField label="Message" multiline rows={4} fullWidth />
              <Button variant="contained">Send Message</Button>
            </Stack>

            <Box
              sx={{
                minHeight: 240,
                borderRadius: 3,
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
