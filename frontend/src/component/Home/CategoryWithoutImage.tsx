import React, { useState } from "react";
import { Box, Grid, Typography, MenuItem } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Kilos",
    subcategories: [],
  },
  {
    name: "Mobiles",
    subcategories: ["Smartphones", "Feature Phones", "Accessories"],
  },
  {
    name: "Fashion",
    subcategories: ["Men", "Women", "Kids"],
  },
  {
    name: "Electronics",
    subcategories: ["Laptops", "Cameras", "Accessories"],
  },
  {
    name: "Home & Furniture",
    subcategories: ["Sofas", "Beds", "Chairs"],
  },
  {
    name: "Appliances",
    subcategories: ["TVs", "Refrigerators", "Washing Machines"],
  },
  {
    name: "Flight Bookings",
    subcategories: [],
  },
  {
    name: "Beauty, Toys & More",
    subcategories: ["Makeup", "Toys", "Games"],
  },
  {
    name: "Two Wheelers",
    subcategories: ["Bikes", "Scooters"],
  },
];

const CategoryWithoutImage: React.FC = () => {
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
        // margin: "10px 0px",
        marginBottom: "10px",
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

export default CategoryWithoutImage;
