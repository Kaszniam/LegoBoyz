import React, { FunctionComponent } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { StyledLink } from "./StyledLink";

export interface HeaderProps {}

export const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <StyledLink to="/">
          <img className="icon" src="/brick.svg" alt="Logo" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LegoBoyz
          </Typography>
        </StyledLink>
      </Toolbar>
    </AppBar>
  );
};

