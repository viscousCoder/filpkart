import React, { Fragment } from "react";
import {
  Container,
  Grid,
  Card,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const DownContact: React.FC = () => {
  return (
    <Fragment>
      {/* Contact Info */}
      <Grid container spacing={3} justifyContent="center">
        {[
          {
            icon: <LocationOnIcon />,
            title: "Visit Our Office",
            text: "Flipkart Internet Private Limited, Bangalore, 560103",
          },
          {
            icon: <PhoneIcon />,
            title: "Call Us",
            text: "Toll Free: 1800 202 9898 \n Available 24/7",
          },
          {
            icon: <EmailIcon />,
            title: "Email Support",
            text: "support@flipkart.com",
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              elevation={3}
              sx={{ textAlign: "center", p: 2, minHeight: "160px" }}
            >
              <IconButton color="primary">{item.icon}</IconButton>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.text}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Business Hours */}
      <Box textAlign="center" my={5}>
        <Typography variant="h6">Business Hours</Typography>
        <Typography variant="body2">
          Monday - Friday: 9:00 AM - 6:00 PM | Saturday: 10:00 AM - 4:00 PM
        </Typography>
      </Box>

      {/* Help Section */}
      <Typography variant="h5" textAlign="center" gutterBottom>
        How Can We Help You?
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {[
          {
            icon: <ChatBubbleOutlineIcon />,
            title: "Live Chat",
            text: "Chat with our support team",
            link: "Start Chat",
          },
          {
            icon: <MenuBookIcon />,
            title: "Help Center",
            text: "Browse knowledge base",
            link: "View Articles",
          },
          {
            icon: <PeopleIcon />,
            title: "Community",
            text: "Connect with customers",
            link: "Join Forum",
          },
          {
            icon: <TwitterIcon />,
            title: "Social Support",
            text: "Reach us on social media",
            link: "",
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={2}
              sx={{ textAlign: "center", p: 2, minHeight: "160px" }}
            >
              <IconButton color="primary">{item.icon}</IconButton>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.text}
              </Typography>
              {item.link && (
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ mt: 1, cursor: "pointer" }}
                >
                  {item.link} →
                </Typography>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default DownContact;
