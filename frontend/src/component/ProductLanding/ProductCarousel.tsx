import React, { useState, useRef, useEffect, Fragment } from "react";
import { Box, Button, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addOrder, addOrderCart, Order } from "../../store/orderSlice";
import { ProductDetails } from "../interfaceTypes/interfaceTypes";

interface Product {
  product: ProductDetails;
}
const ProductCarousel: React.FC<Product> = ({ product }) => {
  console.log(product, "heelo");
  const images = product.images;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showUpArrow, setShowUpArrow] = useState(false);
  const [showDownArrow, setShowDownArrow] = useState(true);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  // Scroll handling
  const handleScroll = (direction: "up" | "down") => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = 60;
      thumbnailContainerRef.current.scrollBy({
        top: direction === "up" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Check visibility of arrows
  useEffect(() => {
    const container = thumbnailContainerRef.current;
    if (!container) return;

    const updateArrows = () => {
      setShowUpArrow(container.scrollTop > 0);
      setShowDownArrow(
        container.scrollTop + container.clientHeight < container.scrollHeight
      );
    };

    container.addEventListener("scroll", updateArrows);
    updateArrows();
    return () => container.removeEventListener("scroll", updateArrows);
  }, []);

  const handleCart = () => {
    const userId = localStorage.getItem("id");
    if (userId)
      dispatch(
        addOrder({
          userId: userId,
          productId: product.id,
          quantity: 1,
          status: "CART",
        })
      );
    localStorage.setItem("direct", "false");
  };

  const handleBuy = async () => {
    const userId = localStorage.getItem("id") ?? "";
    const order: Order = {
      userId,
      product,
      quantity: 1,
      status: "ORDERED",
      freeDelivery: 0,
      name: undefined,
      outer_image: "",
    };
    console.log([order], "hello india");
    await dispatch(addOrderCart([order]));
    localStorage.setItem("direct", "true");
    navigate("/checkout");
  };

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          p: { xs: "0px 10px", md: "0px" },
          maxHeight: "34rem",
          minHeight: "34rem",
        }}
      >
        {/* Thumbnail List */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxHeight: "300px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {showUpArrow && (
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                background: "red",
                zIndex: 1,
                height: "10px",
                width: "100%",
                borderRadius: "0px",
              }}
              onClick={() => handleScroll("up")}
            >
              <ArrowDropUpIcon />
            </IconButton>
          )}

          <Box
            ref={thumbnailContainerRef}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxHeight: "250px",
              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {images?.map(
              (img: { id: string; image: string }, index: number) => (
                <Box
                  key={index}
                  sx={{
                    width: 50,
                    height: 50,
                    border: selectedIndex === index ? "2px solid blue" : "none",
                    margin: "5px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <img
                    src={img.image}
                    alt={`Thumbnail ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // Ensures the image covers the thumbnail area
                    }}
                  />
                </Box>
              )
            )}
          </Box>

          {showDownArrow && (
            <IconButton
              sx={{
                position: "absolute",
                bottom: 0,
                background: "orange",
                zIndex: 1,
                height: "10px",
                width: "100%",
                borderRadius: "0px",
              }}
              onClick={() => handleScroll("down")}
            >
              <ArrowDropDownIcon />
            </IconButton>
          )}
        </Box>

        {/* Main Image Display & Buttons */}
        <Box
          sx={{
            marginLeft: 2,
            width: "400px",
            position: "relative",
            height: "100%", // Ensure dynamic height based on image aspect ratio
          }}
        >
          {/* Favorite Icon */}
          <IconButton
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "white",
              borderRadius: "50%",
            }}
            onClick={() => setIsFavorited(!isFavorited)}
          >
            {isFavorited ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "gray" }} />
            )}
          </IconButton>

          {/* Main Image */}
          <Box
            sx={{
              minHeight: "34rem",
              maxHeight: "34rem",
              width: "100%", // Ensures full width
              height: "100%", // Ensures full height
              backgroundImage: `url(${images[selectedIndex].image})`,
              backgroundSize: "cover", // This ensures the image covers the entire container
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat", // Prevents image repetition
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 2,
          padding: "0 10px",
        }}
      >
        {/* Add to Cart */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FFD700", // Yellow
            color: "black",
            flex: 1,
            marginRight: 1,
            "&:hover": { backgroundColor: "#FFC107" },
            p: "10px",
          }}
          startIcon={<ShoppingCartIcon />}
          onClick={handleCart}
        >
          Add to Cart
        </Button>

        {/* Buy Now */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF6F00", // Orange
            color: "white",
            flex: 1,
            "&:hover": { backgroundColor: "#E65100" },
            p: "10px",
          }}
          startIcon={<ShoppingBagIcon />}
          onClick={handleBuy}
        >
          Buy Now
        </Button>
      </Box>
    </Fragment>
  );
};

export default ProductCarousel;
