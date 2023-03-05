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
import { useQuery } from "@tanstack/react-query";
import { serverClientService } from "../services/ServerClientService";

const socket = io(BACKEND_URL);

export interface SegmentViewProps {}

interface MeasurmentData {
  x: string[]
  temperature: {
    y: number[],
  },
  humidity: {
    y: number[],
  },
  light: {
    y: number[],
  },
}

const initial: MeasurmentData ={
  x: [],
  temperature: {
    y: [],
  },
  humidity: {
    y: [],
  },
  light: {
    y: [],
  },
}
const mergeMeasurments = (previousValue: MeasurmentData, currentValue: Measurment) => {
  return {
    x: [...previousValue.x, currentValue.datetime],
    temperature: {
      y: [...previousValue.temperature.y, currentValue.temperature]
    },
    humidity: {
      y: [...previousValue.humidity.y, currentValue.humidity]
    },
    light: {
      y: [...previousValue.light.y, currentValue.light]
    },
  }
};

export const SegmentView: FunctionComponent<SegmentViewProps> = () => {
  const { segmentId } = useParams<{ segmentId: string }>();

  const { data: serverData } = useQuery(["measurments", segmentId], async () =>{
    const srv = await serverClientService.getMeasurementsForElement(segmentId!!)

        return srv.reduce(mergeMeasurments, initial);
  }
  );
  const historyData = serverData ?? initial;
  const [data, setData] = useState<MeasurmentData>(initial);

  useEffect(() => {
    const listener = (measurement: Measurment) => {
      setData((data) => (mergeMeasurments(data, measurement)));
    };
    socket.on(`measurement-${segmentId}-update`, listener);
    return () => {
      socket.off(`measurement-${segmentId}-update`, listener);
    };
  }, [segmentId, setData]);

  const joinedData:MeasurmentData = {
    x: [...(historyData.x), ...data.x,],
    temperature: {
      y: [...(historyData.temperature.y), ...data.temperature.y,],
    },
    humidity: {
      y: [...(historyData.humidity.y),...data.humidity.y,],
    },
    light: {
      y: [...(historyData.light.y),...data.light.y,],
    },
  }

  return (
    <StyledPageContainer>
      <StyledSegmentPage>
        <StyledLink to="/">
          <ArrowBackIcon className="icon" />
          <Typography variant="h5">Back</Typography>
        </StyledLink>
        <Typography variant="h4">Segment ID: {segmentId}</Typography>
        <div className="segment-details">
          <SegmentDetails rfId={segmentId!!} />
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
                data={{ x: joinedData.x, y: joinedData.temperature.y }}
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
              <div style={{ height: "17rem" }}>
                <LineChart
                  data={{ x: joinedData.x, y: joinedData.humidity.y }}
                  dataTitle="Humidity"
                  graphTitle="Humidity"
                  xAxisTitle="Time"
                  yAxisTitle="%"
                  unit="%"
                />
              </div>
              <div style={{ height: "17rem" }}>
                <LineChart
                  data={{ x: joinedData.x, y: joinedData.light.y }}
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
