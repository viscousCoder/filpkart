import { Box } from "@mui/material";
import { styled } from "@mui/system";
import Carousel from "react-material-ui-carousel";

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: 190,
  [theme.breakpoints.down("sm")]: {
    objectFit: "cover",
    height: 180,
  },
}));

const bannerData = [
  "https://rukminim1.flixcart.com/flap/3376/560/image/d117a62eb5fbb8e1.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/3376/560/image/57267a180af306fe.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/3376/560/image/ae9966569097a8b7.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/3376/560/image/f6202f13b6f89b03.jpg?q=50",
];

const Banner = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Carousel
        autoPlay={true}
        animation="slide"
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
          style: {
            color: "#494949",
            backgroundColor: "#FFFFFF",
            borderRadius: 0,
            margin: 0,
            width: 22,
            height: 100,
            top: "calc(50% - 55px) !important",
          },
        }}
      >
        {bannerData.map((image, index) => (
          <Image src={image} alt={`banner-${index}`} key={index} />
        ))}
      </Carousel>
    </Box>
  );
};

export default Banner;
