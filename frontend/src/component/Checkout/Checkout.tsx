import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import StarIcon from "@mui/icons-material/Star";
import Address from "./Address/Address";
import OrderSummary from "./Order/OrderSummary";
import PriceDetails, { CartItem } from "./Price/PriceDetails";
import Payment from "./Payment/Payment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { userLoginAddress } from "../../store/UserSlice";

interface LoginState {
  email: string;
  password: string;
}
const loginInitialValues: LoginState = {
  email: "",
  password: "",
};

interface AddressInter {
  id?: string;
  name: string;
  phonenumber: string;
  pincode: string;
  locality: string;
  com_address: string;
  city: string;
  state: string;
  landmark: string;
  alternate_phonenumber: string;
  address_type: "HOME" | "WORK"; // Enforce correct types
  isActiveAddress?: boolean; // Optional from API
}
const Checkout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders: cart = [] } = useSelector((state: RootState) => state.orders);
  console.log("Aman", cart);
  const { user } = useSelector((state: RootState) => state.user);

  const [activeStep, setActiveStep] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState<LoginState>(loginInitialValues);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<AddressInter | null>(
    null
  );

  // const direct = localStorage.getItem("direct");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  console.log("cart in the order", cart);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    await dispatch(userLoginAddress({ userData: login }));
    setIsLoggedIn(true);
  };

  //   const handleContinueCheckout = () => {
  //     setCompletedSteps((prev) => [...new Set([...prev, stepIndex])]);
  //     setActiveStep((prev) => prev + 1);
  //   };
  const handleContinueCheckout = (stepIndex: number) => {
    setCompletedSteps((prev) => [...new Set([...prev, stepIndex])]); // Ensure unique entries
    setActiveStep(stepIndex + 1);
  };

  const steps = [
    {
      label: "LOGIN OR SIGNUP",
      subtitle: user ? `${user?.firstname} ${user.email}` : "",
      content: isLoggedIn ? LoggedInView() : LoginForm(),
    },
    {
      label: "DELIVERY ADDRESS",
      subtitle: selectedAddress
        ? `${selectedAddress.name}, ${selectedAddress.pincode}`
        : "Select an address",

      content: (
        <Address
          onContinue={() => handleContinueCheckout(1)}
          onSelectAddress={setSelectedAddress}
        />
      ),
      // <Address
      //   onContinue={
      //     (() => handleContinueCheckout(1),
      //     (setSelectedAddress = { setSelectedAddress }))
      //   }
      // />
    },
    {
      label: "ORDER SUMMARY",
      subtitle: `${cart.length} Items`,
      content: (
        <OrderSummary
          // cart={cart}
          onContinue={() => handleContinueCheckout(2)}
          cart={[]}
        />
      ),
      // direct === "true" ? (
      //   <OrderSummaryBuy
      //     cart={cart}
      //     onContinue={() => handleContinueCheckout(2)}
      //   />
      // ) : (
      // <OrderSummary
      //   cart={cart}
      //   onContinue={() => handleContinueCheckout(2)}
      // />
      // ),
    },
    {
      label: "PAYMENT OPTIONS",
      subtitle: "Select your preferred payment method",
      content: <Payment onContinue={() => handleContinueCheckout(3)} />,
    },
  ];

  function LoginForm() {
    return (
      <Grid container spacing={2} sx={{ minHeight: "30rem" }}>
        <Grid item xs={12} md={6}>
          <TextField
            name="email"
            fullWidth
            label="Enter Email/Mobile number"
            variant="outlined"
            margin="normal"
            value={login.email}
            onChange={onValueChange}
          />
          <TextField
            fullWidth
            name="password"
            label="Enter Email/Mobile number"
            variant="outlined"
            margin="normal"
            value={login.password}
            onChange={onValueChange}
          />
          <Typography variant="body2">
            By continuing, you agree to Flipkart’s{" "}
            <span style={{ color: "#2874f0", cursor: "pointer" }}>
              Terms of Use
            </span>{" "}
            and{" "}
            <span style={{ color: "#2874f0", cursor: "pointer" }}>
              Privacy Policy
            </span>
            .
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, bgcolor: "#ff5722", color: "#fff" }}
            onClick={handleLogin}
          >
            CONTINUE
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            fontWeight="bold"
          >
            Advantages of our secure login
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <LocalShippingIcon sx={{ color: "#1976d2" }} />
              </ListItemIcon>
              <ListItemText primary="Easily Track Orders, Hassle free Returns" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <NotificationsActiveIcon sx={{ color: "#1976d2" }} />
              </ListItemIcon>
              <ListItemText primary="Get Relevant Alerts and Recommendations" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <StarIcon sx={{ color: "#1976d2" }} />
              </ListItemIcon>
              <ListItemText primary="Wishlist, Reviews, Ratings and more." />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    );
  }

  function LoggedInView() {
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography fontWeight="bold">
            Name: {user?.firstname} {user?.lastname}
          </Typography>
          <Typography fontWeight="bold">Phone: {user?.phonenumber}</Typography>
          <Typography sx={{ color: "#2874f0", cursor: "pointer", mt: 1 }}>
            Logout & Sign in to another account
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, bgcolor: "#ff5722", color: "#fff" }}
            onClick={() => handleContinueCheckout(0)}
          >
            CONTINUE CHECKOUT
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            fontWeight="bold"
          >
            Advantages of our secure login
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <LocalShippingIcon sx={{ color: "#1976d2" }} />
              </ListItemIcon>
              <ListItemText primary="Easily Track Orders, Hassle free Returns" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <NotificationsActiveIcon sx={{ color: "#1976d2" }} />
              </ListItemIcon>
              <ListItemText primary="Get Relevant Alerts and Recommendations" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <StarIcon sx={{ color: "#1976d2" }} />
              </ListItemIcon>
              <ListItemText primary="Wishlist, Reviews, Ratings and more." />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {steps.map((step, index) => (
            <Accordion
              key={index}
              expanded={activeStep === index}
              sx={{
                mb: 2,
                "& .MuiAccordionSummary-root": {
                  backgroundColor: activeStep === index ? "#1976d2" : "#f1f3f6",
                  color: activeStep === index ? "#fff" : "#000",
                },
              }}
            >
              <AccordionSummary
                onClick={() => index < activeStep && setActiveStep(index)}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  width="100%"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography fontWeight="bold">
                      {index + 1}. {step.label}
                    </Typography>
                    {completedSteps.includes(index) && (
                      <Typography variant="body2" color="textSecondary">
                        ✅ {step.subtitle}
                      </Typography>
                    )}
                  </Box>
                  {completedSteps.includes(index) && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setActiveStep(index)}
                    >
                      Change
                    </Button>
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails>{step.content}</AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          {isLoggedIn ? (
            <PriceDetails cart={cart as unknown as CartItem[]} />
          ) : (
            <Box sx={{ p: 2, color: "#7a7a7a" }}>
              <Typography fontWeight="bold">
                Safe and Secure Payments. Easy returns.
              </Typography>
              <Typography>100% Authentic products.</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;

//   function PriceDetails() {
//     return (
//       <Card>
//         <CardContent>
//           <Typography variant="h6" fontWeight="bold">
//             PRICE DETAILS
//           </Typography>
//           <Typography>Price (1 item): ₹39,999</Typography>
//           <Typography>
//             Delivery Charges:{" "}
//             <span style={{ textDecoration: "line-through" }}>₹40</span>{" "}
//             <span style={{ color: "green" }}>FREE</span>
//           </Typography>
//           <Typography>Packaging Charge: ₹99</Typography>
//           <Typography fontWeight="bold">Total Payable: ₹40,098</Typography>
//           <Typography color="green" fontWeight="bold">
//             Your Total Savings on this order ₹14,901
//           </Typography>
//         </CardContent>
//       </Card>
//     );
//   }
