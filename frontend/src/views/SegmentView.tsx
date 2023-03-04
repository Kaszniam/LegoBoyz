import { FunctionComponent } from "react";
import { StyledPageContainer } from "../components/StyledPageContainer";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export interface SegmentViewProps {}

export const SegmentView: FunctionComponent<SegmentViewProps> = () => {
  return (
    <StyledPageContainer>
      <div>
        <div>data</div>
        <div>Visualsation WEBGL here</div>
        <div>
          <h1>Charts</h1>
          <div>Usage Chart Here :) </div>
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
        </div>
      </div>
    </StyledPageContainer>
  );
};
