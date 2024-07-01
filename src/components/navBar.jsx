import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";

const drawerWidth = 240;
const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  width: "100%",
});
export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography
          sx={{ position: "absolute", zIndex: 999, left: 50, top: 20 }}
        >
          <InventoryIcon sx={{ position: "absolute", zIndex: 999, left: -30, top: 0 }}/>
          Inventory Management
        </Typography>
        <Toolbar />
        <Divider />
        <List>
          {[
            {
              value: "Products",
              icon: <EmojiObjectsIcon />,
              link: "/products",
            },
            { value: "Vendors", icon: <GroupIcon />, link: "/vendors" },
            { value: "Users", icon: <PersonIcon />, link: "/users" },
            { value: "Orders", icon: <LocalShippingIcon />, link: "/orders" },
            // { value: "Reports", icon: <AssessmentIcon />, link: "/reports" },
          ].map((val) => (
            <ListItem key={val.value} disablePadding>
              <ListItemButton sx={{ textDecorationStyle: "none" }}>
                <StyledLink to={val.link}>
                  <ListItemIcon>{val.icon}</ListItemIcon>
                  <ListItemText primary={val.value} />
                </StyledLink>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
