import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/notfound.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")} // Navigates to home
        sx={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
