import { Grid } from "@mui/material";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Grid container sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Grid
        sx={{
          flexGrow: 1,
        }}
        container
        direction={"column"}
      >
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default Layout;
