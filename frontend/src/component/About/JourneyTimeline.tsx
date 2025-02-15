import React, { Fragment } from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

const timelineData = [
  {
    year: "2008",
    text: "Founded with a vision to revolutionize online shopping in India, making it accessible, affordable, and convenient for everyone.",
  },
  {
    year: "2012",
    text: "Reached 1 million customers and expanded to 100+ cities, strengthening logistics and improving the shopping experience nationwide.",
  },
  {
    year: "2015",
    text: "Launched a mobile app and introduced next-day delivery, enhancing convenience and ensuring faster order fulfillment for users.",
  },
  {
    year: "2018",
    text: "Crossed 50 million users and launched premium membership, offering exclusive deals, priority delivery, and special rewards to members.",
  },
  {
    year: "2023",
    text: "India’s leading e-commerce platform with 100M+ active users, setting new industry standards and expanding into global markets.",
  },
];

const JourneyTimeline: React.FC = () => {
  return (
    <Fragment>
      <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
        Our Journey
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        From a small startup to India's leading e-commerce platform
      </Typography>
      <Timeline position="alternate">
        {timelineData.map((event, index) => (
          <TimelineItem key={event.year}>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              {index !== timelineData.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Card sx={{ p: 1, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography
                    variant="body1"
                    align="center"
                    color="textSecondary"
                  >
                    {event.text}
                  </Typography>
                  <Box
                    sx={{
                      textAlign: "right",
                      color: "primary.main",
                      fontWeight: 600,
                      mt: 1,
                    }}
                  >
                    {event.year}
                  </Box>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Fragment>
  );
};

export default JourneyTimeline;
