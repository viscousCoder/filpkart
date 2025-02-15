import React, { Fragment } from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import {
  People,
  VerifiedUser,
  Lightbulb,
  LocalShipping,
  Support,
  TrendingUp,
} from "@mui/icons-material";

const stats = [
  { label: "Happy Customers", value: "50M+" },
  { label: "Products Listed", value: "100K+" },
];

// const highlights = [
//   {
//     icon: <People />,
//     title: "Customer First",
//     description: "Always putting our customers first",
//   },
//   {
//     icon: <Lightbulb />,
//     title: "Innovation",
//     description: "Constantly improving our services",
//   },
//   {
//     icon: <VerifiedUser />,
//     title: "Quality Assured",
//     description: "Rigorous quality checks",
//   },
// ];

const highlights = [
  {
    icon: <People />,
    title: "Customer First",
    description: "Always putting our customers first",
  },
  {
    icon: <Lightbulb />,
    title: "Innovation",
    description: "Constantly improving our services",
  },
  {
    icon: <VerifiedUser />,
    title: "Quality Assured",
    description: "Rigorous quality checks",
  },
];

const highlightSecond = [
  {
    icon: <LocalShipping />,
    title: "Fast Delivery",
    description: "Quick and reliable shipping service",
  },
  {
    icon: <Support />,
    title: "24/7 Support",
    description: "Always here to assist you anytime",
  },
  {
    icon: <TrendingUp />,
    title: "Growth Focused",
    description: "Scaling with excellence and ambition",
  },
];

const values = [
  {
    icon: <Lightbulb />,
    title: "Innovation First",
    description:
      "Continuously evolving our platform with cutting-edge technology to provide seamless shopping experiences.",
  },
  {
    icon: <People />,
    title: "Customer Trust",
    description:
      "Building lasting relationships through transparency, reliability, and exceptional service quality.",
  },
  {
    icon: <VerifiedUser />,
    title: "Quality Assurance",
    description:
      "Maintaining stringent quality standards and authenticity checks for all products on our platform.",
  },
];

const EccomSection: React.FC = () => {
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} md={5}>
          {/* Header Section */}

          <Box textAlign="center" mb={4}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Revolutionizing E-commerce Since 2008
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              maxWidth={600}
              mx="auto"
            >
              We started with a simple mission: to make quality products
              accessible to everyone. Today, we're one of India's leading
              e-commerce platforms, serving millions of happy customers.
            </Typography>
          </Box>

          {/* Stats Section */}
          <Grid container spacing={4} justifyContent="center" mb={4}>
            {stats.map((stat, index) => (
              <Grid item key={index}>
                <Typography variant="h5" color="primary" fontWeight={700}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: "primary.main",
              color: "white",
              maxWidth: "80%",
              mx: "auto",
              marginRight: "0",
              mb: 6,
            }}
          >
            {/* Highlight Box */}
            <Grid container>
              <Grid item xs={12} md={6}>
                {highlights.map((item, index) => (
                  <Box key={index} display="flex" alignItems="right" mb={2}>
                    {item.icon}
                    <Box ml={2}>
                      <Typography fontWeight={600}>{item.title}</Typography>
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Grid>
              <Grid item xs={12} md={6}>
                {highlightSecond.map((item, index) => (
                  <Box key={index} display="flex" alignItems="right" mb={2}>
                    {item.icon}
                    <Box ml={2}>
                      <Typography fontWeight={600}>{item.title}</Typography>
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Mission & Values Section */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h5" fontWeight={700}>
          Our Mission & Values
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Empowering consumers and sellers across India with the best-in-class
          shopping experience
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {values.map((value, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card elevation={3} sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                <Box display="flex" justifyContent="center" mb={1}>
                  {value.icon}
                </Box>
                <Typography fontWeight={600}>{value.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Stats */}
      <Grid container spacing={4} justifyContent="center" mt={4}>
        <Grid item>
          <Typography variant="h6" color="primary" fontWeight={700}>
            100M+
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Active Users
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" color="primary" fontWeight={700}>
            50K+
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sellers
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" color="primary" fontWeight={700}>
            95%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Customer Satisfaction
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default EccomSection;
