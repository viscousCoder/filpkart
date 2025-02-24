import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RegisterDialouge from "../LoginAuthDialog.tsx/RegisterDialouge";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { User } from "../interfaceTypes/interfaceTypes";
import { getCurrUser, logout } from "../../store/UserSlice";
import SearchBar from "./SearchBar";
import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { fetchOrders } from "../../store/orderSlice";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector<RootState>((state) => state.user.user) as User;
  const cart = useSelector((state: RootState) => state.orders.orders);

  // const token = localStorage.getItem("token");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState(""); // Store logged-in user
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const handleClick = () => setOpen(true);
  const handleHome = () => navigate("/");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(getCurrUser());
    const userId = localStorage.getItem("id");
    if (userId) dispatch(fetchOrders({ status: "CART" }));
  }, [account, dispatch]);

  // Handle user menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    console.log("hii");
    setAnchorEl(event.currentTarget);
  };
  // const data = cart.map((item) => {
  //   if (item.status === "CART") {
  //     return item;
  //   }
  //   console.log(item.status);
  // });
  const data = cart?.filter((item) => item.status === "CART");
  console.log("data", data.length, data, "cart", cart);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    setAccount(""); // Clear user session
    setAnchorEl(null);
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/userprofile");
    handleMenuClose();
  };

  const handleOrder = () => {
    navigate("/userprofile/orders");
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#2874F0", px: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left: Logo */}
          <Box display={"flex"} flexDirection={"row"} width={"90%"}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  color: "white",
                  mr: 1,
                  cursor: "pointer",
                }}
                onClick={handleHome}
              >
                Flipkart
              </Typography>
              <Typography variant="caption" sx={{ color: "#FFC220" }}>
                Explore{" "}
                <Box component="span" sx={{ fontWeight: "bold" }}>
                  Plus
                </Box>{" "}
                ✨
              </Typography>
            </Box>

            {/* Search Bar */}

            <SearchBar />
          </Box>
          {/* Right Section (Hidden on Mobile) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              width: "14rem",
              justifyContent: "space-around",
            }}
          >
            {user?.firstname ? (
              <Button
                onClick={handleMenuOpen}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textTransform: "none",
                  color: "black",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  minWidth: "150px",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <PersonIcon sx={{ color: "gray", mr: 1 }} />
                <Typography variant="body1">{user?.firstname}</Typography>
                {anchorEl ? (
                  <KeyboardArrowUpIcon sx={{ ml: 1, color: "gray" }} />
                ) : (
                  <KeyboardArrowDownIcon sx={{ ml: 1, color: "gray" }} />
                )}
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "#2874F0",
                  textTransform: "none",
                }}
                onClick={handleClick}
              >
                Login
              </Button>
            )}

            <IconButton
              sx={{ color: "white" }}
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartIcon />
              <CartBadge
                badgeContent={data?.length}
                color="error"
                overlap="circular"
              />
            </IconButton>
          </Box>

          {/* Mobile Hamburger Menu */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" }, color: "white" }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { mt: 1, boxShadow: 3, width: 200 },
        }}
      >
        <MenuItem onClick={handleProfile}>
          <AccountCircleIcon sx={{ mr: 1, color: "primary.main" }} />
          My Profile
        </MenuItem>
        <MenuItem onClick={handleOrder}>
          <ListAltIcon sx={{ mr: 1, color: "primary.main" }} />
          Orders
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <FavoriteIcon sx={{ mr: 1, color: "primary.main" }} />
          Wishlist
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <LocalOfferIcon sx={{ mr: 1, color: "primary.main" }} />
          Coupons
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ExitToAppIcon sx={{ mr: 1, color: "error.main" }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, p: 2 }}>
          <IconButton onClick={toggleDrawer} sx={{ mb: 2 }}>
            <CloseIcon />
          </IconButton>

          {/* Login / User?.firstname Menu */}
          {user?.firstname ? (
            <>
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Aman" />
              </ListItem>
              <Divider />
            </>
          ) : (
            <Button fullWidth variant="contained" onClick={handleClick}>
              Login
            </Button>
          )}

          {/* Cart Always Visible */}
          <ListItem>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItem>

          {/* Additional Menu Items if Logged In */}
          {user?.firstname && (
            <>
              <ListItem>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" onClick={handleOrder} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="Wishlist" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalOfferIcon />
                </ListItemIcon>
                <ListItemText primary="Coupons" />
              </ListItem>
              <Divider />
              <ListItem onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon sx={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ color: "red" }} />
              </ListItem>
            </>
          )}
        </Box>
      </Drawer>

      {/* Login Dialog */}
      <RegisterDialouge open={open} setOpen={setOpen} setAccount={setAccount} />
    </>
  );
};

export default Header;
