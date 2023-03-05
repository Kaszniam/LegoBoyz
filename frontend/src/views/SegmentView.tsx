import { FunctionComponent, useState } from "react";
import { StyledPageContainer } from "../components/StyledPageContainer";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DateTime } from "luxon";
import { StyledLink } from "../components/StyledLink";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";
import { SegmentVisualization } from "./segmentView/SegmentVisualization";
import { SegmentDetails } from "./segmentView/SegmentDetails";
import { LineChart } from "../components/LineChart";
import { io } from "socket.io-client";
const socket = io("localhost:3000");

// ChartJS.register(
//   ChartStreaming,
//   CategoryScale,
//   LinearScale,
//   TimeScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const options = {
//   responsive: false,
//   maintainAspectRatio: false,
//   scales: {
//     x: {
//       type: "realtime",
//       realtime: {
//         duration: 1000 * 60 * 60,
//       },
//       title: {
//         display: true,
//         text: "Date",
//       },
//     },
//   },
// };

export interface SegmentViewProps {}

export const SegmentView: FunctionComponent<SegmentViewProps> = () => {
  const { segmentId } = useParams<{ segmentId: string }>();

  const [chartData, setChartData] = useState(
    Array.from({ length: 100 })
      .map((i, index) => ({
        x: DateTime.now().minus({ hours: index }).toISO(),
        y: Math.random() * 10,
      }))
      .reverse()
  );
  const [labels, setLabels] = useState(
    Array.from({ length: 1000 }).map((i, index) =>
      DateTime.now().minus({ minutes: 48 }).toISO()
    )
  );

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const newLabel = DateTime.now().toISO();
  //     setChartData((current) => {
  //       return [
  //         ...current,
  //         {
  //           x: newLabel,
  //           y: Math.random() * 10,
  //         },
  //       ];
  //     });
  //     setLabels((labels) => [...labels, newLabel]);
  //   }, 5000);
  //   return () => clearInterval(intervalId);
  // }, []);
  const [data, setData] = useState<{x: string[], y: number[]}>({
    x: [],
    y: [],
  });

  socket.on("measurement-020200000000000000004399-update", (d: {measurement: { temperature: number, datetime: string}}) => {
    setData({
      x: [...data.x, d.measurement.datetime],
      y: [...data.y, d.measurement.temperature],
    })
  });

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
                data={data}
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
