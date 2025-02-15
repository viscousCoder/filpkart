import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  CardMedia,
} from "@mui/material";

const categories = [
  "Shorts",
  "Harem Pants",
  "Jeggings",
  "Skirts",
  "Three-Fourths",
];
const filters = [
  "High to Low",
  "Low to High",
  "Above 4 Stars",
  "Above 3 Stars",
  "Above 2 Stars",
];

const FilterSidebar: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([1000, 50000]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <>
      {/* Ad Banner */}
      <Card sx={{ mb: 3 }}>
        <CardMedia
          component="img"
          // height="140"
          image="https://res.cloudinary.com/dcrkamxfi/image/upload/v1739216286/Eccomerce_flipkart/i9ifhebam8v9zcv84tsi.jpg"
          alt="Ad Banner"
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            height: "9rem",
            width: "auto !important",
          }}
        />
        <CardContent>
          <Typography variant="h6">Baggy Jeans, Cargos...</Typography>
          <Typography variant="body2" color="textSecondary">
            From ₹249+ Extra 15% Off
          </Typography>
        </CardContent>
      </Card>

      {/* Filters Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <Typography variant="subtitle2">Categories</Typography>
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                control={<Checkbox />}
                label={category}
              />
            ))}
          </FormGroup>

          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Price Range
          </Typography>
          <Slider
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue as number[])}
            min={1}
            max={100000}
            valueLabelDisplay="auto"
          />

          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Ratings
          </Typography>
          <FormGroup>
            {filters.map((filter) => (
              <FormControlLabel
                key={filter}
                control={
                  <Checkbox
                    checked={selectedFilters.includes(filter)}
                    onChange={() => handleFilterChange(filter)}
                  />
                }
                label={filter}
                sx={{
                  bgcolor: selectedFilters.includes(filter)
                    ? "#ddd"
                    : "transparent",
                  borderRadius: 1,
                  padding: "5px",
                }}
              />
            ))}
          </FormGroup>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterSidebar;
