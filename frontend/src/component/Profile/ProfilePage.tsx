import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
} from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  ShoppingCart as ShoppingCartIcon,
  Payment as PaymentIcon,
  CardGiftcard as CardGiftcardIcon,
  Logout as LogoutIcon,
  HelpOutline as HelpOutlineIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

// Sidebar menu items
const ProfilePage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState("Profile Information");
  const [isEditing, setIsEditing] = useState(false);

  const menuItems = useMemo(
    () => [
      { title: "My Orders", icon: <ShoppingCartIcon /> },
      {
        title: "Account Settings",
        icon: <AccountCircleIcon />,
        subItems: [
          "Profile Information",
          "Manage Addresses",
          "PAN Card Information",
        ],
      },
      {
        title: "Payments",
        icon: <PaymentIcon />,
        subItems: ["Gift Cards", "Saved UPI", "Saved Cards"],
      },
      {
        title: "My Stuff",
        icon: <CardGiftcardIcon />,
        subItems: [
          "My Coupons",
          "My Reviews & Ratings",
          "All Notifications",
          "My Wishlist",
        ],
      },
      { title: "Logout", icon: <LogoutIcon /> },
    ],
    []
  );

  return (
    <Grid container>
      {/* Sidebar */}
      <Grid item xs={12} md={4}>
        <Box width={280} bgcolor="white" p={2} boxShadow={1}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Avatar sx={{ bgcolor: "primary.main" }}>A</Avatar>
            <Typography fontWeight="bold">Hello, Aman Bisht</Typography>
          </Box>

          <List>
            {menuItems.map((item, index) => (
              <Box key={index}>
                <ListItemButton
                  onClick={() => setSelectedSection(item.title)}
                  selected={selectedSection === item.title}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
                {item.subItems &&
                  item.subItems.map((subItem, subIndex) => (
                    <ListItemButton
                      key={subIndex}
                      onClick={() => setSelectedSection(subItem)}
                      selected={selectedSection === subItem}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={subItem} />
                    </ListItemButton>
                  ))}
              </Box>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="textSecondary" ml={2}>
            Frequently Visited
          </Typography>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <HelpOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Track Order" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Help Center" sx={{ pl: 5 }} />
            </ListItemButton>
          </List>
        </Box>
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} md={8}>
        <Box flex={1} p={3} bgcolor="white" boxShadow={1} mx={2} my={2}>
          {selectedSection === "Profile Information" && (
            <>
              <Typography variant="h6" fontWeight="bold">
                Personal Information{" "}
                <EditIcon
                  sx={{ cursor: "pointer", ml: 1 }}
                  onClick={() => setIsEditing(!isEditing)}
                />
              </Typography>

              {/* Personal Information Form */}
              <Box display="flex" gap={2} mt={2}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  disabled={!isEditing}
                  defaultValue="Aman"
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  disabled={!isEditing}
                  defaultValue="Bisht"
                />
              </Box>

              <Typography mt={2}>Your Gender</Typography>
              <RadioGroup row defaultValue="male">
                <FormControlLabel
                  value="male"
                  control={<Radio disabled={!isEditing} />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio disabled={!isEditing} />}
                  label="Female"
                />
              </RadioGroup>

              <TextField
                label="Email Address"
                fullWidth
                disabled={!isEditing}
                defaultValue="amanbisht1010@gmail.com"
                sx={{ mt: 2 }}
              />
              <TextField
                label="Mobile Number"
                fullWidth
                disabled={!isEditing}
                defaultValue="+916396969169"
                sx={{ mt: 2 }}
              />

              <FAQs />
              <AccountActions />

              {/* Footer Image */}
              <Box mt={5} textAlign="center">
                <img
                  src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myProfileFooter_4e9fe2.png"
                  alt="Footer"
                  width="80%"
                />
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;

// Reusable FAQs Component
const FAQs = () => (
  <>
    <Typography variant="h6" fontWeight="bold" mt={3}>
      FAQs
    </Typography>
    {[
      {
        question:
          "What happens when I update my email address (or mobile number)?",
        answer:
          "Your login email id (or mobile number) changes, likewise. You’ll receive all your account-related communication on your updated email address (or mobile number).",
      },
      {
        question:
          "When will my Flipkart account be updated with the new email address (or mobile number)?",
        answer:
          "It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.",
      },
      {
        question:
          "What happens to my existing Flipkart account when I update my email address (or mobile number)?",
        answer:
          "Updating your email address (or mobile number) doesn’t invalidate your account. Your account remains fully functional.",
      },
      {
        question:
          "Does my Seller account get affected when I update my email address?",
        answer:
          "Flipkart has a ‘single sign-on’ policy. Any changes will reflect in your Seller account also.",
      },
    ].map((faq, index) => (
      <Box key={index} mt={2}>
        <Typography fontWeight="bold">{faq.question}</Typography>
        <Typography>{faq.answer}</Typography>
      </Box>
    ))}
  </>
);

// Reusable Account Actions Component
const AccountActions = () => (
  <Box mt={3}>
    <Button variant="text" color="primary">
      Deactivate Account
    </Button>
    <Button variant="text" color="error" sx={{ ml: 2 }}>
      Delete Account
    </Button>
  </Box>
);
