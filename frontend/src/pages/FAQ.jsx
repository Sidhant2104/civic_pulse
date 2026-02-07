import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    q: "How do I report a civic issue?",
    a: "Use the Report Issue page to submit details, location, and optional photos.",
  },
  {
    q: "How do I track my complaint?",
    a: "Use the Track Issue page with your unique issue ID to view status updates.",
  },
  {
    q: "What happens when an issue is delayed?",
    a: "CivicPulse escalates overdue issues to senior authorities based on SLA rules.",
  },
  {
    q: "Can I update or add more details?",
    a: "Yes. You can submit additional information through the issue timeline.",
  },
];

export default function FAQ() {
  return (
    <Box className="page-fade" sx={{ py: { xs: 6, md: 10 } }}>
      <Container>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h4">Frequently Asked Questions</Typography>
            <Typography color="text.secondary">
              Quick answers to common questions about CivicPulse.
            </Typography>
          </Box>
          <Stack spacing={2}>
            {faqs.map((item) => (
              <Accordion key={item.q} className="hover-lift">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{item.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{item.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
