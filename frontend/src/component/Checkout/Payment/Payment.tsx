import React, { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { addOrder, updateOrderStatus } from "../../../store/orderSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  onContinue: () => void; // Function to mark the accordion as completed
}

const Payment: React.FC<Props> = ({ onContinue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { orders } = useSelector((state: RootState) => state.orders);
  const direct = localStorage.getItem("direct");
  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  // console.log(orders, "Aman order");
  const handleContinue = () => {
    if (direct === "false") {
      const orderId = orders?.map((item) => item?.id || "");
      dispatch(updateOrderStatus({ orderIds: orderId, status: "ORDERED" }));
    } else {
      const userId = localStorage.getItem("id");
      if (userId)
        dispatch(
          addOrder({
            userId: userId,
            productId: orders[0]?.product?.id || "",
            quantity: 1,
            status: "ORDERED",
          })
        );
    }
    // dispatch(addOrder)
    navigate("/order/success");
    onContinue();
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          Select a Payment Method
        </Typography>
        <Divider sx={{ my: 2 }} />

        <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
          <FormControlLabel
            value="card"
            control={<Radio />}
            label="Credit / Debit Card"
          />
          <FormControlLabel
            value="upi"
            control={<Radio />}
            label="UPI / Net Banking"
          />
          <FormControlLabel
            value="cod"
            control={<Radio />}
            label="Cash on Delivery (COD)"
          />
        </RadioGroup>

        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF9F00",
              "&:hover": { backgroundColor: "#e68900" },
            }}
            onClick={handleContinue}
            disabled={!paymentMethod}
          >
            Continue
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Payment;
