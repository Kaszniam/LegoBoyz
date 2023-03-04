import { FunctionComponent } from "react";
import { StyledPageContainer } from "../components/StyledPageContainer";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  css,
  makeStyles,
  styled,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export interface SegmentViewProps {}

export const SegmentView: FunctionComponent<SegmentViewProps> = () => {
  return (
    <StyledPageContainer>
      <StyledSegmentPage>
        <div className="segment-details">
          <div>data</div>
          <Visualisation>
            <img src="/ape.png" alt="Ape together string" />
          </Visualisation>
        </div>
        <div className="segment-charts">
          <h1>Charts</h1>
          <div>Usage Chart Here :)</div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Other
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <StyledView></StyledView>
        </div>
      </StyledSegmentPage>
    </StyledPageContainer>
  );
};

const StyledSegmentPage = styled("div")`
  display: flex;
  flex-direction: column;

  & .segment-details {
    height: 20rem;
    display: flex;
    gap: 1rem;

    & > * {
      flex: 1;
      box-shadow: #61dafb 1px 1px 10px 5px;
    }
  }

  & .segment-charts {
    display: flex;
    flex-direction: column;
  }
`;

const Visualisation = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  
  & img {
    overflow: hidden;
    object-fit: fill;
    width: 100%;
    height: 100%;
  }

`;

const StyledView = styled("div")`
  width: 2rem;

  background-color: ${(theme) => theme.theme.palette.primary.light};

  & .icon {
  }
`;
