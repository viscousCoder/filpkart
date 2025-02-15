import React, { useState } from "react";
import { Box, Grid, Typography, MenuItem } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Kilos",
    image:
      "https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
    subcategories: [],
  },
  {
    name: "Mobiles",
    image:
      "https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100",
    subcategories: ["Smartphones", "Feature Phones", "Accessories"],
  },
  {
    name: "Fashion",
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/0d75b34f7d8fbcb3.png?q=100",
    subcategories: ["Men", "Women", "Kids"],
  },
  {
    name: "Electronics",
    image:
      "https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
    subcategories: ["Laptops", "Cameras", "Accessories"],
  },
  {
    name: "Home & Furniture",
    image:
      "https://rukminim2.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100",
    subcategories: ["Sofas", "Beds", "Chairs"],
  },
  {
    name: "Appliances",
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/0139228b2f7eb413.jpg?q=100",
    subcategories: ["TVs", "Refrigerators", "Washing Machines"],
  },
  {
    name: "Flight Bookings",
    image:
      "https://rukminim2.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100",
    subcategories: [],
  },
  {
    name: "Beauty, Toys & More",
    image:
      "https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100",
    subcategories: ["Makeup", "Toys", "Games"],
  },
  {
    name: "Two Wheelers",
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/05d708653beff580.png?q=100",
    subcategories: ["Bikes", "Scooters"],
  },
];

const CategoryHeader: React.FC = () => {
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleHover = (
    event: React.MouseEvent<HTMLElement>,
    categoryName: string
  ) => {
    // setAnchorEl(event.currentTarget);
    setOpenCategory(categoryName);
  };

  const handleClose = () => {
    // setAnchorEl(null);
    setOpenCategory(null);
  };

  const handleCategoryClick = (categoryName: string) => {
    console.log("hii");
    navigate(`/categories/${categoryName.toLowerCase()}`);
  };

  const handleSubcategoryClick = (
    categoryName: string,
    subcategoryName: string
  ) => {
    navigate(
      `/categories/${categoryName.toLowerCase()}/${subcategoryName.toLowerCase()}`
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        py: 2,
        borderBottom: "1px solid #ddd",
        margin: "10px 0px",
      }}
    >
      <Grid container spacing={2} justifyContent="space-evenly">
        {categories.map((category) => (
          <Grid
            item
            key={category.name}
            onMouseEnter={(e) =>
              category.subcategories.length > 0 && handleHover(e, category.name)
            }
            onMouseLeave={handleClose}
            onClick={() => handleCategoryClick(category.name)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <img
              src={category.image}
              alt={category.name}
              width={70}
              height={70}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1">{category.name}</Typography>
              {category.subcategories.length > 0 && (
                <ExpandMore sx={{ fontSize: 16 }} />
              )}
            </Box>

            {openCategory === category.name && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "white",
                  boxShadow: 3,
                  borderRadius: 1,
                  minWidth: 150,
                  zIndex: 10,
                  overflowX: "auto",
                  maxHeight: 200,
                  px: 2,
                  py: 1,
                }}
              >
                {category.subcategories.map((sub) => (
                  <MenuItem
                    key={sub}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubcategoryClick(category.name, sub);
                    }}
                  >
                    {sub}
                  </MenuItem>
                ))}
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryHeader;
