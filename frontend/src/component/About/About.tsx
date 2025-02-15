import { Box } from "@mui/material";
import EccomSection from "./EccomSection";
import JourneyTimeline from "./JourneyTimeline";

const About = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <EccomSection />
      <Box sx={{ height: 10 }} />
      <JourneyTimeline />
    </Box>
  );
};

export default About;
