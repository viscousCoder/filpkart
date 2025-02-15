import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoProductFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Box
        sx={{
          backgroundColor: "white",
          padding: { xs: 3, md: 6 },
          borderRadius: 2,
          boxShadow: 1,
          textAlign: "center",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
          alt="Empty Cart"
          width="200"
          style={{ marginBottom: 20 }}
        />

        {/* Heading */}
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          No Product Found
        </Typography>

        {/* Subtext */}
        <Typography variant="body1" color="textSecondary">
          Search another amazing products
        </Typography>

        {/* Shop Now Button */}
        <Button
          variant="contained"
          sx={{
            marginTop: 3,
            backgroundColor: "#2874f0",
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "16px",
            padding: "10px 20px",
            "&:hover": { backgroundColor: "#1157c7" },
          }}
          onClick={() => navigate("/")}
        >
          Explore More
        </Button>
      </Box>
    </Container>
    // {/* </Box> */}
  );
};

export default NoProductFound;
