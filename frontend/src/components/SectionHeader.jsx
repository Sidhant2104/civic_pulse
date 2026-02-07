import { Stack, Typography } from "@mui/material";

export default function SectionHeader({ title, subtitle, align = "left" }) {
  return (
    <Stack spacing={1} sx={{ textAlign: align }}>
      <Typography variant="h4">{title}</Typography>
      {subtitle ? (
        <Typography color="text.secondary">{subtitle}</Typography>
      ) : null}
    </Stack>
  );
}
