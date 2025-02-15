import { Card, CardActionArea, CardMedia } from "@mui/material";

const Banner = ({ image }) => {
  return (
    <Card sx={{ maxWidth: 256, margin: "10px 5px", height: " 23rem " }}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ height: "23rem", width: "16rem" }}
          image={image}
          alt="Random Image"
        />
      </CardActionArea>
    </Card>
  );
};

export default Banner;
