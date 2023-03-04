import { FunctionComponent, useState } from "react";
import { StyledPageContainer } from "../components/StyledPageContainer";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import ChartStreaming from "chartjs-plugin-streaming";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import { DateTime } from "luxon";
import { StyledLink } from "../components/StyledLink";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

ChartJS.register(
  ChartStreaming,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: false,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "realtime",
      realtime: {
        duration: 1000 * 60 * 60,
      },
      title: {
        display: true,
        text: "Date",
      },
    },
  },
};

export interface SegmentViewProps {}

export const SegmentView: FunctionComponent<SegmentViewProps> = () => {
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
  return (
    <StyledPageContainer>
      <StyledSegmentPage>
        <StyledLink to="/">
          <ArrowBackIcon className="icon" />
          <Typography variant="h5">Back</Typography>
        </StyledLink>
        <Typography variant="h4">Segment ID: 1234-ASDF-4567.</Typography>
        <div className="segment-details">
          <Paper>
            <Table aria-label="Segment Details">
              <TableHead>
                <TableRow>
                  <TableCell>Resource</TableCell>
                  <TableCell align="right">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>ID</TableCell>
                  <TableCell align="right">1234-ASDF-4567</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>Material</TableCell>
                  <TableCell align="right">Wood</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>Manufacturer</TableCell>
                  <TableCell align="right">Samsung</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>Mounted Time</TableCell>
                  <TableCell align="right">01-11-2017</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>Demounted Time</TableCell>
                  <TableCell align="right">01-11-2020</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>Used Time</TableCell>
                  <TableCell align="right">3 years, 2 months</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          <Visualisation>
            <img src="/ape.png" alt="Ape together string" />
          </Visualisation>
        </div>
        <div className="segment-charts">
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Lifespan
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Line
                height={300}
                width={1300}
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Lifespan",
                      data: chartData,
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                  ],
                }}
                options={options}
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

const Visualisation = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    overflow: hidden;
    object-fit: fill;
    //width: 100%;
    height: 100%;
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
