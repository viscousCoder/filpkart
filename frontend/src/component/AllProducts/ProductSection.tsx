import React, { Fragment, useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import NoProductFound from "./NoProductFound";

const ProductSection: React.FC = () => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("");

  const { products } = useSelector((state: RootState) => state.products);

  const handleNavigate = (id: string) => {
    navigate(`/product/${id}`);
  };

  function discount(originalPrice: number, discountPercentage: number) {
    return (originalPrice - (originalPrice * discountPercentage) / 100).toFixed(
      0
    );
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "popularity") {
      return b.rating - a.rating;
    } else if (sortOption === "priceHighToLow") {
      return b.price - a.price;
    } else if (sortOption === "priceLowToHigh") {
      return a.price - b.price;
    }
    return 0;
  });
  console.log(products.length, "hello");

  return (
    <Fragment>
      {products?.length <= 0 ? (
        <NoProductFound />
      ) : (
        <>
          {/* Sorting Options */}
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Sort By:
            <Button
              variant={sortOption === "popularity" ? "contained" : "text"}
              color={sortOption === "popularity" ? "primary" : "inherit"}
              onClick={() => setSortOption("popularity")}
            >
              Popularity
            </Button>
            <Button
              variant={sortOption === "priceLowToHigh" ? "contained" : "text"}
              color={sortOption === "priceLowToHigh" ? "primary" : "inherit"}
              onClick={() => setSortOption("priceLowToHigh")}
            >
              Price -- Low to High
            </Button>
            <Button
              variant={sortOption === "priceHighToLow" ? "contained" : "text"}
              color={sortOption === "priceHighToLow" ? "primary" : "inherit"}
              onClick={() => setSortOption("priceHighToLow")}
            >
              Price -- High to Low
            </Button>
            <Button
              variant={sortOption === "" ? "contained" : "text"}
              color={sortOption === "" ? "primary" : "inherit"}
              onClick={() => setSortOption("")}
            >
              Reset
            </Button>
          </Typography>

          {/* Product Grid */}
          <Grid container spacing={3}>
            {sortedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card
                  sx={{
                    "&:hover": { transform: "scale(1.02)", transition: "0.3s" },
                    minHeight: 635,
                    maxHeight: 635,
                  }}
                  onClick={() => handleNavigate(product.id!)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.outer_image}
                    alt={product.name}
                    sx={{
                      // objectFit: "contain",
                      display: "block",
                      mx: "auto",
                      width: "100%",
                      height: 430,
                    }}
                  />
                  <CardContent sx={{ maxHeight: 200, minHeight: 200 }}>
                    <Typography variant="body2">
                      {product.company_name}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {product.name.length > 20
                        ? product.name.slice(0, 20) + "...."
                        : product.name}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <Typography variant="body1" fontWeight="bold">
                        ₹{discount(product.price, product.discount)}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="gray"
                        sx={{ textDecoration: "line-through" }}
                      >
                        ₹{product.price}
                      </Typography>
                      <Chip
                        label={`${product.discount}% off`}
                        color="success"
                        size="small"
                      />
                    </Box>
                    <Typography component={"span"} sx={{ color: "#888" }}>
                      {product.overview.length > 100
                        ? product.overview.slice(0, 90) + "..."
                        : product.overview}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Fragment>
  );
};

export default ProductSection;
