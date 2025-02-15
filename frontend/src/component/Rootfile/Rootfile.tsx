import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CssBaseline } from "@mui/material";

const Rootfile = () => {
  return (
    <Box sx={{ m: 0, p: 0, backgroundColor: "#f1f2f4" }}>
      <CssBaseline />
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex", minHeight: "40rem" }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Rootfile;
