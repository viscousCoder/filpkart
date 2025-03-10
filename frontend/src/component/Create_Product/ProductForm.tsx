import React, { useState } from "react";
import {
  TextField,
  Button,
  Autocomplete,
  Grid,
  IconButton,
  Box,
  Typography,
  InputAdornment,
  Chip,
  Container,
} from "@mui/material";
import {
  AddCircle,
  Delete,
  Close,
  ArrowBack,
  ArrowForward,
  AttachFile,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { createProduct } from "../../store/productInsertSlice";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Kilos", subcategories: [], company: ["Surfexel", "Data"] },
  { name: "Mobiles", subcategories: ["Apple", "MI", "POCO", "Vivo"] },
  {
    name: "Fashion",
    subcategories: ["Men", "Women", "Kids"],
    company: [
      "Levis",
      "Roadster",
      "Puma",
      "Adidas",
      "Peter-England",
      "Zudio",
      "Nike",
      "Jordan",
    ],
  },
  {
    name: "Electronics",
    subcategories: ["Laptops", "Cameras", "Accessories"],
    company: ["Apple", "Sony", "Dell", "HP"],
  },
  {
    name: "Home & Furniture",
    subcategories: ["Sofas", "Beds", "Chairs"],
    company: ["Dewaan", "Singhals"],
  },
  {
    name: "Appliances",
    subcategories: ["TVs", "Refrigerators", "Washing Machines"],
    company: ["Sony", "Wirphool", ""],
  },
  {
    name: "Flight Bookings",
    subcategories: [],
    company: ["IndiGO", "Air Bus"],
  },
  {
    name: "Beauty, Toys & More",
    subcategories: ["Makeup", "Toys", "Games"],
    company: ["Himalayan", "Garnier"],
  },
  {
    name: "Two Wheelers",
    subcategories: ["Bikes", "Scooters"],
    company: ["Hero", "TVS", "Honda", "Jupitor"],
  },
];

const initialProductState = {
  name: "",
  subtitle: [""],
  outer_image: "",
  all_images: [] as string[],
  price: "",
  rating: "",
  overview: "",
  company_name: "",
  category: "",
  subcategory: "",
  quantity: "",
  discount: "",
};

const ProductForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState(initialProductState);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [, setouterImage] = useState<File | null>(null);
  const [, setAllImages] = useState<File[]>([]);
  // Handle field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle image uploads
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "outer_image" | "all_images"
  ) => {
    // console.log(event.target.files);
    const files = event.target.files;
    // console.log(files[0]);
    if (files) {
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      if (field === "outer_image") {
        setProductDetails((prevState) => ({
          ...prevState,
          outer_image: imageUrls[0],
        }));
        setouterImage(files[0]);
      } else {
        setProductDetails((prevState) => ({
          ...prevState,
          all_images: [...prevState.all_images, ...imageUrls],
        }));
        setAllImages([...files]);
      }
    }
  };

  // Add or remove subtitle fields
  const handleAddSubtitle = () => {
    setProductDetails((prevState) => ({
      ...prevState,
      subtitle: [...prevState.subtitle, ""],
    }));
  };

  const handleRemoveSubtitle = (index: number) => {
    const newSubtitles = [...productDetails.subtitle];
    newSubtitles.splice(index, 1);
    setProductDetails((prevState) => ({
      ...prevState,
      subtitle: newSubtitles,
    }));
  };

  // Validate the form
  const validateForm = () => {
    // eslint-disable-next-line prefer-const
    let errors: { [key: string]: string } = {};
    const {
      name,
      price,
      rating,
      overview,
      company_name,
      quantity,
      discount,
      all_images,
      outer_image,
      subtitle,
      category,
    } = productDetails;

    if (!name.trim()) errors.name = "Product name is required.";
    if (!price.trim()) errors.price = "Price is required.";
    if (!rating.trim()) errors.rating = "Rating is required.";
    if (!overview.trim()) errors.overview = "Overview is required.";
    if (!company_name.trim()) errors.company_name = "Company name is required.";
    if (!quantity.trim()) errors.quantity = "Quantity is required.";
    if (!discount.trim()) errors.discount = "Discount is required.";

    if (
      selectedCategory &&
      categories.find((cat) => cat.name === selectedCategory)?.subcategories
        ?.length &&
      !selectedSubcategory
    ) {
      errors.subcategory = "Please select a subcategory.";
    }

    if (all_images.length < 1) errors.all_images = "Images are required";
    if (!outer_image.trim()) errors.outer_image = "Outer image is required";
    if (!subtitle[0].trim()) errors.subtitle = "Subtitle is required";
    if (!category.trim()) errors.category = "category is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  console.log(productDetails, "hellos");
  const handleSubmit = () => {
    if (validateForm()) {
      console.log(productDetails, "hellos");

      dispatch(
        createProduct({
          productData: productDetails,
          navigate,
        })
      );
    }
  };

  const currentCategory = categories.find(
    (cat) => cat.name === selectedCategory
  );
  const subcategoryOptions = currentCategory?.subcategories || [];

  // Handle image thumbnail selection
  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleNextImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % productDetails.all_images.length
    );
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + productDetails.all_images.length) %
        productDetails.all_images.length
    );
  };

  const handleRemoveImage = (image: string) => {
    const updatedImages = productDetails.all_images.filter(
      (img) => img !== image
    );
    setProductDetails((prevState) => ({
      ...prevState,
      all_images: updatedImages,
    }));
  };

  return (
    <Container sx={{ mb: 10 }}>
      <Grid container spacing={2}>
        {/* Left side: Form fields */}
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2, boxShadow: 3 }}>
            <TextField
              label="Product Name"
              name="name"
              value={productDetails.name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
            />

            {productDetails.subtitle.map((subtitle, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  margin="normal"
                  label={`Subtitle ${index + 1}`}
                  name={`subtitle-${index}`}
                  value={subtitle}
                  onChange={(e) => {
                    const newSubtitles = [...productDetails.subtitle];
                    newSubtitles[index] = e.target.value;
                    setProductDetails((prevState) => ({
                      ...prevState,
                      subtitle: newSubtitles,
                    }));
                  }}
                  fullWidth
                  error={!!errors.subtitle}
                  helperText={errors.subtitle}
                  InputProps={{
                    endAdornment: (
                      <>
                        <IconButton
                          onClick={handleAddSubtitle}
                          sx={{
                            marginRight: 1,
                            backgroundColor: "#f0f0f0",
                            borderRadius: "50%",
                          }}
                        >
                          <AddCircle />
                        </IconButton>
                        {/* Display Delete button for each subtitle field */}
                        {productDetails.subtitle.length > 1 && (
                          <IconButton
                            onClick={() => handleRemoveSubtitle(index)}
                          >
                            <Delete />
                          </IconButton>
                        )}
                      </>
                    ),
                  }}
                />
              </Box>
            ))}

            <TextField
              label="Price"
              name="price"
              value={productDetails.price}
              onChange={handleChange}
              fullWidth
              required
              type="number"
              error={!!errors.price}
              helperText={errors.price}
              margin="normal"
            />

            <TextField
              label="Rating"
              name="rating"
              value={productDetails.rating}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.rating}
              helperText={errors.rating}
              margin="normal"
            />

            <TextField
              label="Overview"
              name="overview"
              value={productDetails.overview}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
              error={!!errors.overview}
              helperText={errors.overview}
              margin="normal"
            />

            <Autocomplete
              options={categories.map((cat) => cat.name)}
              value={selectedCategory}
              //   onChange={(event, newValue) => {
              //     setSelectedCategory(newValue || "");
              //     setSelectedSubcategory("");
              //   }}
              onChange={(_, newValue) => {
                setSelectedCategory(newValue || "");
                setSelectedSubcategory("");
                setProductDetails((prevState) => ({
                  ...prevState,
                  category: newValue || "", // Update category in product details
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  fullWidth
                  margin="normal"
                  required
                  error={!!errors.category}
                  helperText={errors.category}
                />
              )}
            />

            <Autocomplete
              options={subcategoryOptions}
              value={selectedSubcategory}
              //   onChange={(event, newValue) =>
              //     setSelectedSubcategory(newValue || "")
              //   }
              onChange={(_, newValue) => {
                setSelectedSubcategory(newValue || "");
                setProductDetails((prevState) => ({
                  ...prevState,
                  subcategory: newValue || "",
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Subcategory"
                  fullWidth
                  margin="normal"
                  disabled={subcategoryOptions.length === 0}
                  error={!!errors.subcategory}
                  helperText={errors.subcategory}
                />
              )}
            />

            {/* Autocomplete for Company Name */}
            <Autocomplete
              options={
                selectedCategory
                  ? categories.find((cat) => cat.name === selectedCategory)
                      ?.company || []
                  : []
              }
              value={productDetails.company_name}
              onChange={(_, newValue) => {
                setProductDetails((prevState) => ({
                  ...prevState,
                  company_name: newValue || "",
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Company Name"
                  fullWidth
                  margin="normal"
                  required
                  error={!!errors.company_name}
                  helperText={errors.company_name}
                />
              )}
              disabled={!selectedCategory}
            />

            {/* <TextField
              label="Company Name"
              name="company_name"
              value={productDetails.company_name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.company_name}
              helperText={errors.company_name}
              margin="normal"
            /> */}

            <TextField
              label="Quantity"
              name="quantity"
              value={productDetails.quantity}
              onChange={handleChange}
              fullWidth
              required
              type="number"
              error={!!errors.quantity}
              helperText={errors.quantity}
              margin="normal"
            />

            <TextField
              label="Discount"
              name="discount"
              value={productDetails.discount}
              onChange={handleChange}
              fullWidth
              required
              type="number"
              error={!!errors.discount}
              helperText={errors.discount}
              margin="normal"
            />

            <Box sx={{ width: "100%", marginTop: 2 }}>
              <TextField
                margin="normal"
                label="Outer Image"
                value={productDetails.outer_image || ""}
                disabled
                fullWidth
                InputProps={{
                  endAdornment: (
                    <>
                      {productDetails.outer_image && (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setProductDetails({
                                ...productDetails,
                                outer_image: "",
                              })
                            }
                          >
                            <Close />
                          </IconButton>
                        </InputAdornment>
                      )}
                      <InputAdornment position="end">
                        <label
                          htmlFor="outer-image-upload"
                          style={{ cursor: "pointer" }}
                        >
                          <IconButton component="span">
                            <AttachFile />
                          </IconButton>
                        </label>
                      </InputAdornment>
                    </>
                  ),
                }}
                variant="outlined"
                error={!!errors.outer_image}
                helperText={errors.outer_image}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "outer_image")}
                style={{ display: "none" }}
                id="outer-image-upload"
              />

              <TextField
                margin="normal"
                label="All Images"
                value={
                  productDetails.all_images.length > 0 ? "Images Selected" : ""
                }
                disabled
                fullWidth
                InputProps={{
                  endAdornment: (
                    <>
                      {productDetails.all_images.length > 0 && (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setProductDetails({
                                ...productDetails,
                                all_images: [],
                              })
                            }
                          >
                            <Close />
                          </IconButton>
                        </InputAdornment>
                      )}
                      <InputAdornment position="end">
                        <label
                          htmlFor="all-images-upload"
                          style={{ cursor: "pointer" }}
                        >
                          <IconButton component="span">
                            <AttachFile />
                          </IconButton>
                        </label>
                      </InputAdornment>
                    </>
                  ),
                }}
                variant="outlined"
                // Using custom styling to make room for Chips
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                error={!!errors.all_images}
                helperText={errors.all_images}
              />

              {/* Chip Section inside the TextField */}
              <Box
                sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginTop: 1 }}
              >
                {productDetails.all_images.map((image, index) => (
                  <Chip
                    key={index}
                    label={`Image ${index + 1}`}
                    onDelete={() => handleRemoveImage(image)}
                    variant="outlined"
                    sx={{
                      borderRadius: 20,
                      backgroundColor: "lightgray",
                      marginBottom: 1,
                      height: "fit-content",
                      display: "flex",
                      alignItems: "center",
                    }}
                  />
                ))}
              </Box>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e, "all_images")}
                style={{ display: "none" }}
                id="all-images-upload"
              />
            </Box>
          </Box>
        </Grid>

        {/* Right side: Image Carousel */}
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2, backgroundColor: "#f4f4f4" }}>
            <Box
              sx={{
                height: 300,
                backgroundColor: "#ddd",
                position: "relative",
              }}
            >
              <Typography
                variant="h6"
                sx={{ position: "absolute", top: 20, left: 20, color: "black" }}
              >
                Create a New Product and Enjoy the Things!
              </Typography>
              {productDetails.outer_image && (
                <img
                  src={productDetails.outer_image}
                  alt="Outer"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </Box>

            {productDetails.all_images.length > 0 && (
              <Box sx={{ marginTop: 2 }}>
                {/* Carousel */}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={productDetails.all_images[selectedImageIndex]}
                    alt="Selected"
                    style={{ width: "100%", height: 300, objectFit: "cover" }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 1,
                  }}
                >
                  {productDetails.all_images.map((image, idx) => (
                    <Box key={idx} sx={{ marginRight: 1 }}>
                      <img
                        src={image}
                        alt={`preview_${idx}`}
                        width={60}
                        height={60}
                        style={{ objectFit: "cover", cursor: "pointer" }}
                        onClick={() => handleThumbnailClick(idx)}
                      />
                    </Box>
                  ))}
                </Box>

                {/* Next / Previous buttons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 2,
                  }}
                >
                  {/* <Button variant="contained" onClick={handlePreviousImage}>
                  Previous
                </Button>
                <Button variant="contained" onClick={handleNextImage}>
                  Next
                </Button> */}
                  <IconButton onClick={handlePreviousImage}>
                    <ArrowBack />{" "}
                  </IconButton>
                  <IconButton onClick={handleNextImage}>
                    <ArrowForward />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};

export default ProductForm;
