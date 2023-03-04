import React, { FunctionComponent } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export interface HeaderProps {}

export const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LegoBoyz
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
