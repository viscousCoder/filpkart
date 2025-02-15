// import React from "react";
// import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// const About: React.FC = () => {
//   return (
//     <Container>
//       <Box>
//         {/* Hero Section */}
//         <Box sx={{ color: "black", py: 10 }}>
//           <Container>
//             <Grid container spacing={4} alignItems="center">
//               <Grid item xs={12} md={6}>
//                 <Typography variant="h3" fontWeight="bold">
//                   About FlipMart
//                 </Typography>
//                 <Typography variant="body1" sx={{ mt: 2 }}>
//                   Leading the e-commerce revolution with innovation, trust, and
//                   customer satisfaction at our core.
//                 </Typography>
//                 <Button variant="contained" sx={{ mt: 3, bgcolor: "blue" }}>
//                   Learn More
//                 </Button>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     // bgcolor: "#d4d4d4",
//                     borderRadius: 2,
//                     height: 50,
//                     px: 3,
//                   }}
//                 >
//                   <ShoppingCartIcon sx={{ color: "blue", fontSize: 30 }} />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Container>
//         </Box>

//         {/* About Section */}
//         <Container sx={{ py: 8 }}>
//           <Typography variant="h4" fontWeight="bold">
//             Revolutionizing E-commerce Since 2008
//           </Typography>
//           <Typography variant="body1" sx={{ mt: 2, maxWidth: "600px" }}>
//             We started with a simple mission: to make quality products
//             accessible to everyone. Today, we're one of India's leading
//             e-commerce platforms, serving millions of happy customers.
//           </Typography>
//           <Grid container spacing={4} sx={{ mt: 4 }}>
//             <Grid item xs={6}>
//               <Typography variant="h5" color="blue" fontWeight="bold">
//                 50M+
//               </Typography>
//               <Typography variant="body2">Happy Customers</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="h5" color="blue" fontWeight="bold">
//                 100K+
//               </Typography>
//               <Typography variant="body2">Products Listed</Typography>
//             </Grid>
//           </Grid>
//         </Container>

//         {/* Our Mission & Values Section */}
//         <Box sx={{ bgcolor: "#F9FAFB", py: 8 }}>
//           <Container>
//             <Typography variant="h4" fontWeight="bold" align="center">
//               Our Mission & Values
//             </Typography>
//             <Typography
//               variant="body1"
//               align="center"
//               sx={{ maxWidth: 600, mx: "auto", mt: 2 }}
//             >
//               Empowering consumers and sellers across India with the
//               best-in-class shopping experience.
//             </Typography>

//             {/* Feature Cards */}
//             <Grid container spacing={4} sx={{ mt: 6 }}>
//               {[
//                 {
//                   title: "Innovation First",
//                   desc: "Continuously evolving our platform with cutting-edge technology to provide seamless shopping experiences.",
//                   icon: "⚡",
//                 },
//                 {
//                   title: "Customer Trust",
//                   desc: "Building lasting relationships through transparency, reliability, and exceptional service quality.",
//                   icon: "👥",
//                 },
//                 {
//                   title: "Quality Assurance",
//                   desc: "Maintaining stringent quality standards and authenticity checks for all products on our platform.",
//                   icon: "🛡️",
//                 },
//               ].map((item, index) => (
//                 <Grid item xs={12} md={4} key={index}>
//                   <Paper
//                     elevation={3}
//                     sx={{
//                       p: 3,
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       textAlign: "center",
//                     }}
//                   >
//                     <Typography fontSize={40}>{item.icon}</Typography>
//                     <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
//                       {item.title}
//                     </Typography>
//                     <Typography variant="body2" sx={{ mt: 1 }}>
//                       {item.desc}
//                     </Typography>
//                   </Paper>
//                 </Grid>
//               ))}
//             </Grid>
//           </Container>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default About;

import { Container } from "@mui/material";
import About from "../../component/About/About";

const AboutUs = () => {
  return (
    <Container>
      <About />
    </Container>
  );
};

export default AboutUs;
