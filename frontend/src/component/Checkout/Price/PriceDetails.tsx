import React from "react";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Product } from "../../interfaceTypes/interfaceTypes";

interface CartItem {
  product: Product;
  quantity: number;
  id: string;
  status: string;
}

interface Props {
  cart: CartItem[];
}

const PriceDetails: React.FC<Props> = ({ cart }) => {
  console.log("card insde the buy", cart);
  function discount(originalPrice: number, discountPercentage: number) {
    return Number(
      (originalPrice - (originalPrice * discountPercentage) / 100).toFixed(0)
    );
  }
  const totalPrice = cart?.reduce(
    (sum, item) =>
      sum +
      discount(item?.product?.price, item?.product?.discount) * item.quantity,
    0
  );
  const totalDiscount = cart?.reduce(
    (acc, item) =>
      acc +
      (item?.product?.price -
        discount(item.product?.price, item.product?.discount)) *
        item.quantity,
    0
  );
  console.log(totalPrice, "Data", totalDiscount);

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            PRICE DETAILS
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between">
            <Typography>Price ({cart?.length} items)</Typography>
            <Typography>₹{totalPrice + totalDiscount}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography>Discount</Typography>
            <Typography color="green">-₹{totalDiscount}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography color="green">Coupons Applied</Typography>
            <Typography color="green">-₹50</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography>Platform Fee</Typography>
            <Typography>₹3</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography>Delivery Charges</Typography>
            <Typography color="green">Free</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between" fontWeight="bold">
            <Typography>Total Amount</Typography>
            <Typography>₹{totalPrice + 3 - 50}</Typography>
          </Box>
          <Typography color="green">
            You will save ₹{totalDiscount + 50} on this order
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              color: "gray",
            }}
          >
            <InfoIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2">
              Safe and Secure Payments. Easy Returns. 100% Authentic products.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PriceDetails;
