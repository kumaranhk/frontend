import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  const drawerWidth = 240;
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, mb: 5  }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div"></Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
