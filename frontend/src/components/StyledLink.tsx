import {styled} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

export const StyledLink = styled(RouterLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  .icon {
    max-height: 32px;
    margin-right: 0.5rem;
  }
`;
