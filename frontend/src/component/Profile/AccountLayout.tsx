import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const AccountLayout: React.FC = () => {
  return (
    <Container>
      {/* <Box display="flex" sx={{ minHeight: "100%", bgcolor: "#f5f5f5" }}> */}
      <Grid container>
        <Grid
          item
          xs={12}
          md={3}
          mb={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box flex={1} p={3} bgcolor="white" boxShadow={1} mx={2}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
      {/* </Box> */}
    </Container>
  );
};

export default AccountLayout;
