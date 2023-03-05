import { FunctionComponent, useEffect, useState } from "react";
import { StyledPageContainer } from "../components/StyledPageContainer";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StyledLink } from "../components/StyledLink";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";
import { SegmentVisualization } from "./segmentView/SegmentVisualization";
import { SegmentDetails } from "./segmentView/SegmentDetails";
import { LineChart } from "../components/LineChart";
import { io } from "socket.io-client";
import { BACKEND_URL } from "../consts";
import { Measurment } from "../domain/Measurment";

const socket = io(BACKEND_URL);

export interface SegmentViewProps {}

export const SegmentView: FunctionComponent<SegmentViewProps> = () => {
  const { segmentId } = useParams<{ segmentId: string }>();

  const [data, setData] = useState({
    x: [] as string[],
    temperature: {
      y: [] as number[],
    },
    humidity: {
      y: [] as number[],
    },
    light: {
      y: [] as number[],
    },
  });

  useEffect(() => {
    const listener = (measurement: Measurment) => {
      setData((data) => ({
        x: [...data.x, measurement.datetime],
        temperature: {
          y: [...data.temperature.y, measurement.temperature],
        },
        humidity: {
          y: [...data.humidity.y, measurement.humidity],
        },
        light: {
          y: [...data.light.y, measurement.light],
        },
      }));
    };
    socket.on("measurement-update", listener);
    return () => {
      socket.off("measurement-update", listener);
    };
  }, [segmentId, setData]);

  return (
    <StyledPageContainer>
      <StyledSegmentPage>
        <StyledLink to="/">
          <ArrowBackIcon className="icon" />
          <Typography variant="h5">Back</Typography>
        </StyledLink>
        <Typography variant="h4">Segment ID: {segmentId}</Typography>
        <div className="segment-details">
          <SegmentDetails />
          <SegmentVisualization segmentId={segmentId!!} />
        </div>
        <div className="segment-charts">
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>Lifespan</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ height: "20rem" }}>
              <LineChart
                data={{ x: data.x, y: data.temperature.y }}
                dataTitle="temp"
                graphTitle="Temperature"
                xAxisTitle="Time"
                yAxisTitle="C"
                unit="C"
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Other Factors
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ height: "10rem" }}>
                <LineChart
                  data={{ x: data.x, y: data.humidity.y }}
                  dataTitle="Humidity"
                  graphTitle="Humidity"
                  xAxisTitle="Time"
                  yAxisTitle="%"
                  unit="%"
                />
              </div>
              <div style={{ height: "10rem" }}>
                <LineChart
                  data={{ x: data.x, y: data.light.y }}
                  dataTitle="Light"
                  graphTitle="Light"
                  xAxisTitle="Time"
                  yAxisTitle="Lux"
                  unit="Lux"
                />
              </div>
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
  gap: 2rem;

  & .segment-details {
    min-height: 20rem;
    display: flex;
    gap: 1rem;

    & > * {
      flex: 1;
      //box-shadow: #61dafb 1px 1px 10px 5px;
    }
  }

  & .segment-charts {
    display: flex;
    flex-direction: column;
  }
`;

const StyledView = styled("div")`
  width: 2rem;

  background-color: ${(theme) => theme.theme.palette.primary.light};

  & .icon {
  }
`;

// const StyledLine = styled(Line)`
//
// `;
