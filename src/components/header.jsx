import { AppBar, IconButton, Toolbar, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/log-in");
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          mb: 5,
        }}
      >
        <Toolbar sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <IconButton sx={{ color: "white" }} onClick={logOut}>
            <Tooltip title="Log out">
              <LogoutIcon />
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};
