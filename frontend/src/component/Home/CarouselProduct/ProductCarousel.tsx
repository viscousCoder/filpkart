import React, { useState, useRef } from "react";
import Slider from "react-slick";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

// interface Item {
//   img: string;
//   title: string;
//   offer: string;
//   company?: string;
// }
interface Item {
  id?: string | undefined;
  img?: string;
  title?: string;
  offer?: string;
  company_name?: string;
  outer_image: string;
  name: string;
  price: number | string;
}

interface Props {
  title: string;
  items: Item[];
  isCompany?: boolean;
}

const CarouselComponent: React.FC<Props> = ({
  title,
  items,
  isCompany = true,
}) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const slidesToShow = isSmallScreen ? 1 : isMediumScreen ? 3 : 5;

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentSlide(index),
  };

  // const handleClick = (item: Item) => {
  //   isCompany
  //     ? navigate(`/top-product/${item.company_name}`)
  //     : navigate(`/product/${item.id}`);
  // };
  const handleClick = (item: Item) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isCompany
      ? navigate(`/top-product/${item.company_name}`)
      : navigate(`/product/${item.id}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "100%",
        p: 2,
        bgcolor: "white",
        m: "10px 0px",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        {title}
      </Typography>

      <IconButton
        sx={{
          position: "absolute",
          left: 10,
          top: "50%",
          zIndex: 2,
          display: currentSlide > 0 ? "block" : "none",
        }}
        onClick={() => sliderRef.current?.slickPrev()}
      >
        <ArrowBackIos />
      </IconButton>

      <Slider ref={sliderRef} {...settings}>
        {items?.map((item) => (
          <Box
            key={item?.id}
            sx={{
              textAlign: "center",
              px: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => handleClick(item)}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={item?.outer_image}
                alt={item?.name}
                style={{ height: "235px", objectFit: "contain" }}
              />
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {item?.name}
            </Typography>
            <Typography variant="caption" fontWeight="bold">
              {item?.price}
            </Typography>
            {item.company_name && (
              <Typography variant="body1" fontWeight="bold">
                {item?.company_name}
              </Typography>
            )}
          </Box>
        ))}
      </Slider>

      <IconButton
        sx={{
          position: "absolute",
          right: 10,
          top: "50%",
          zIndex: 2,
          display:
            currentSlide < items?.length - slidesToShow ? "block" : "none",
        }}
        onClick={() => sliderRef.current?.slickNext()}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default CarouselComponent;
