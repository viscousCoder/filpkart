import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  Grid,
  Avatar,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Sample Data
const coupons = [
  "Special Price: Get extra 25% off on 50 items (price inclusive of cashback/coupon) T&C",
  "10% off on HDFC Credit Card EMI (6 & 9 months) T&C",
  "5% Cashback on Flipkart Axis Bank Card T&C",
];
const offers = [
  "Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Credit Card T&C",
  "Bank Offer: 10% instant discount on SBI Credit Card EMI Transactions, up to ₹1,500 on orders of ₹5,000 and above T&C",
  "Bank Offer: 10% off up to ₹1,200 on HDFC Bank Credit Card EMI on 6 and 9 months tenure. Min Txn Value: ₹5000 T&C",
  "Combo Offer: Buy 2 or more items save ₹20 See all products T&C",
  "Bank Offer: 10% off up to ₹1,500 on HDFC Bank Credit Card EMI on 12 months tenure. Min Txn Value: ₹5000 T&C",
  "Bank Offer: 10% off up to ₹1,250 on IDFC FIRST Bank Credit EMI Txns on orders of ₹5,000 and above T&C",
  "Bank Offer: 5% off up to ₹750 on IDFC FIRST Power Women Platinum and Signature Debit Card. Min Txn Value: ₹5,000 T&C",
];

const sizes = [6, 7, 8, 9, 10, 11, 12];
const colors = ["/black-shoe.png", "/gray-shoe.png", "/navy-blue-shoe.png"];

interface ProductDetails {
  id: string;
  name: string;
  subtitles: { id: string; text: string }[];
  outer_image: string;
  images: { id: string; image: string }[];
  price: number;
  rating: number;
  overview: string;
  company_name: string;
  category: string;
  subcategory: string;
  quantity: number;
  discount: number;
}
interface ProductDet {
  product: ProductDetails;
}
const ProductDetails: React.FC<ProductDet> = ({ product }) => {
  // const { loading, product } = useSelector<RootState>(
  //   (state) => state.productDetail
  // );
  console.log("hello", product);
  const [showMoreCoupons, setShowMoreCoupons] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showMoreBank, setShowMoreBank] = useState(false);
  const [showAll, setShowAll] = useState(false);
  function discount(originalPrice: number, discountPercentage: number) {
    return (originalPrice - (originalPrice * discountPercentage) / 100).toFixed(
      0
    );
  }
  return (
    <Box p={3} maxWidth={800} mx="auto">
      {/* Company Name and Title */}
      <Typography variant="body2" color="gray">
        {product.company_name}
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        {product.name}
      </Typography>

      {/* Special Price */}
      <Typography color="green" fontWeight="bold">
        Special Price
      </Typography>

      {/* Price Section */}
      <Box display="flex" alignItems="center" gap={1} mt={1}>
        <Typography variant="h5" fontWeight="bold">
          ₹{discount(product.price, product.discount)}
        </Typography>
        <Typography
          variant="body1"
          color="gray"
          sx={{ textDecoration: "line-through" }}
        >
          ₹{product.price}
        </Typography>
        <Chip label={`${product.discount}% off`} color="success" size="small" />
      </Box>

      {/* Rating & Reviews */}
      <Box display="flex" alignItems="center" gap={1} mt={1}>
        <Chip label={`${product.rating}⭐`} color="primary" size="small" />
        <Typography variant="body2" color="gray">
          1,09,419 ratings & 12,198 reviews
        </Typography>
        <CheckCircleIcon color="success" />
      </Box>

      {/* overview section*/}
      <Box mt={2}>
        <Typography variant="body1">{product.overview}</Typography>
      </Box>

      {/* heightligh section*/}

      <Box mt={3}>
        <Typography variant="h6" fontWeight="bold" color="grey.700">
          Specification
        </Typography>
        <List>
          {product.subtitles
            .slice(0, showAll ? product.subtitles.length : 3)
            .map((item, index) => (
              <ListItem
                key={index}
                sx={{ display: "flex", alignItems: "center" }}
              >
                • <Typography ml={1}>{item.text}</Typography>
              </ListItem>
            ))}
        </List>
        {product.subtitles.length > 5 && (
          <Button
            variant="text"
            onClick={() => setShowAll(!showAll)}
            sx={{ textTransform: "none", color: "blue" }}
          >
            {showAll ? "Show less" : "See all"}
          </Button>
        )}
      </Box>
      {/* Coupons Section */}
      <Box mt={2}>
        <Typography variant="h6">Coupons for You</Typography>
        <List>
          {coupons
            .slice(0, showMoreCoupons ? coupons.length : 1)
            .map((coupon, index) => (
              <ListItem
                key={index}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <LocalOfferIcon color="success" />
                <Typography ml={1}>{coupon}</Typography>
              </ListItem>
            ))}
          <Button
            onClick={() => setShowMoreCoupons(!showMoreCoupons)}
            color="primary"
          >
            {showMoreCoupons ? "Show Less" : "+2 more coupons"}
          </Button>
        </List>
      </Box>

      {/* Available Offers */}

      <Box mt={2}>
        <Typography variant="h6">Available Offers</Typography>
        <List>
          {offers
            .slice(0, showMoreBank ? offers.length : 4)
            .map((offer, index) => (
              <ListItem key={index}>
                <LocalOfferIcon color="success" />
                <Typography ml={1}>{offer}</Typography>
              </ListItem>
            ))}
          {offers.length > 4 && (
            <Button
              onClick={() => setShowMoreBank(!showMoreBank)}
              color="primary"
            >
              {showMoreBank
                ? "Show Less"
                : `+${offers.length - 4} more bank offers`}
            </Button>
          )}
        </List>
      </Box>

      {/* Delivery & Service */}

      <Box mt={2}>
        <Typography variant="h6">Delivery & Services</Typography>
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Box display={"flex"}>
            <Typography variant="body1" width={"60%"}>
              Deliver to <strong>John Doe</strong> - 123, XYZ Street, New York,
              NY 10001
            </Typography>
            <Chip label="Home" icon={<HomeIcon />} />
          </Box>
          <Typography variant="body2" color="green">
            ✔ Cash on Delivery available
          </Typography>
        </Box>
      </Box>

      {/* Color Selection */}
      <Box mt={2}>
        <Typography variant="h6">Color</Typography>
        <ToggleButtonGroup
          value={selectedColor}
          exclusive
          onChange={(e, newColor) => setSelectedColor(newColor)}
        >
          {colors.map((color, index) => (
            <ToggleButton
              key={index}
              value={color}
              sx={{ borderRadius: "8px", p: 1 }}
            >
              <Avatar
                src={color}
                variant="square"
                sx={{ width: 50, height: 50 }}
              />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Size Selection */}
      <Box mt={2}>
        <Typography variant="h6">Size</Typography>
        <Grid container spacing={1}>
          {sizes.map((size) => (
            <Grid item key={size}>
              <Button
                variant={selectedSize === size ? "contained" : "outlined"}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Typography color="gray">
          Tip: This product runs one size larger. Please buy a smaller size.
        </Typography>
      </Box>

      {/* Seller & Product Details */}
      <Box mt={2}>
        <Typography variant="h6">Seller: AsianShoe</Typography>
        <Typography color="gray">10 days return policy</Typography>
      </Box>

      {/* Add to Cart */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        startIcon={<ShoppingCartIcon />}
      >
        Add to Cart
      </Button>
    </Box>
  );
};

export default ProductDetails;
