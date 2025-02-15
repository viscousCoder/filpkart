import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Paper,
  Collapse,
} from "@mui/material";
import {
  Home,
  Person,
  Payment,
  Star,
  ExitToApp,
  History,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { logout } from "../../../store/UserSlice";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [openAccount, setOpenAccount] = useState(true);
  const [openPayments, setOpenPayments] = useState(true);
  const [openMyStuff, setOpenMyStuff] = useState(true);
  const [disabled] = useState(true);

  const [selectedItem, setSelectedItem] = useState("Profile Information");

  const handleNavigate = (text: string) => {
    if (text === "Profile Information") navigate("/userprofile");
    if (text === "Manage Address") navigate("address");
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };
  return (
    <Paper
      elevation={3}
      sx={{ width: 300, bgcolor: "white", height: "100%", boxShadow: 2, p: 2 }}
    >
      {/* User Profile */}
      <Box display="flex" alignItems="center" p={2}>
        <Avatar sx={{ bgcolor: "yellow", mr: 2 }}>A</Avatar>
        <Box>
          <Typography variant="body2" color="gray">
            Hello,
          </Typography>
          <Typography fontWeight="bold">
            {user?.firstname} {user?.lastname}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* MY ORDERS */}
      <List>
        <ListItem
          //   component="button"
          // selected={selectedItem === "MY ORDERS"}
          onClick={() => {
            setSelectedItem("MY ORDERS");
            navigate("orders");
          }}
          sx={{ color: selectedItem === "MY ORDERS" ? "blue" : "black" }}
        >
          <ListItemIcon>
            <Home color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="MY ORDERS"
            sx={{ fontWeight: "900 !important" }}
          />
        </ListItem>
      </List>

      <Divider />

      {/* ACCOUNT SETTINGS */}
      <List>
        <ListItem
          //   component="button"
          onClick={() => setOpenAccount(!openAccount)}
        >
          <ListItemIcon>
            <Person color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="ACCOUNT SETTINGS"
            sx={{ fontWeight: "900 !important" }}
          />
          {openAccount ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openAccount} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {["Profile Information", "Manage Address"].map((text, index) => (
              <ListItem
                key={index}
                sx={{
                  pl: 4,
                  color: selectedItem === text ? "blue" : "black",
                }}
                // selected={selectedItem === text}
                onClick={() => {
                  setSelectedItem(text);
                  handleNavigate(text);
                }}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      <Divider />

      {/* PAYMENTS */}

      <List>
        <ListItem
          //   component="button"

          onClick={() => setOpenPayments(!openPayments)}
        >
          <ListItemIcon>
            <Payment color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="PAYMENTS"
            sx={{ fontWeight: "900 !important" }}
          />
          {openPayments ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openPayments} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {["Gift Cards", "Saved UPI", "Saved Cards"].map((text) => (
              <ListItem
                component="div"
                key={text}
                sx={{
                  pl: 4,
                  color: selectedItem === text ? "blue" : "black",
                  pointerEvents: disabled ? "none" : "auto",
                  opacity: disabled ? 0.5 : 1,
                  backgroundColor:
                    selectedItem === text ? "lightblue" : "transparent",
                }}
                // selected={selectedItem === text}
                onClick={() => setSelectedItem(text)}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      <Divider />

      {/* MY STUFF */}
      <List>
        <ListItem
          //   component="button"
          onClick={() => setOpenMyStuff(!openMyStuff)}
        >
          <ListItemIcon>
            <Star color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="MY STUFF"
            sx={{ fontWeight: "900 !important" }}
          />
          {openMyStuff ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMyStuff} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[
              "My Coupons",
              "My Reviews & Ratings",
              "All Notifications",
              "My Wishlist",
            ].map((text) => (
              <ListItem
                component="div"
                key={text}
                sx={{
                  pl: 4,
                  color: selectedItem === text ? "blue" : "black",
                  pointerEvents: disabled ? "none" : "auto",
                  opacity: disabled ? 0.5 : 1,
                  backgroundColor:
                    selectedItem === text ? "lightblue" : "transparent",
                }}
                // selected={selectedItem === text}
                onClick={() => setSelectedItem(text)}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      <Divider />

      {/* LOGOUT */}
      <List>
        <ListItem
        // component="button"
        >
          <ListItemIcon>
            <ExitToApp color="error" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            sx={{ color: "red" }}
            onClick={handleLogout}
          />
        </ListItem>
      </List>

      <Divider />

      {/* Frequently Visited */}
      <Box p={2}>
        <Typography
          sx={{ fontSize: "14px", fontWeight: "bold", color: "gray" }}
        >
          Frequently Visited
        </Typography>
        <List>
          {["Track Order", "Help Center"].map((text) => (
            <ListItem
              component="div"
              key={text}
              sx={{
                color: selectedItem === text ? "blue" : "black",
                pointerEvents: disabled ? "none" : "auto",
                opacity: disabled ? 0.6 : 1,
                backgroundColor:
                  selectedItem === text ? "lightblue" : "transparent",
              }}
              // selected={selectedItem === text}
              onClick={() => setSelectedItem(text)}
            >
              <ListItemIcon>
                <History color="primary" />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default Sidebar;
