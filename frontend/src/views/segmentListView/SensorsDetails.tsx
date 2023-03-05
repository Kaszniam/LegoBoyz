import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { LineChart } from "../../components/LineChart";
import { Measurment } from "../../domain/Measurment";
import { io } from "socket.io-client";
import { BACKEND_URL } from "../../consts";

const socket = io(BACKEND_URL);

export interface SensorsDetailsProps {}

interface Measurments {
  [key: string]: {
    x: string[];
    temperature: {
      y: number[];
    };
    humidity: {
      y: number[];
    };
    light: {
      y: number[];
    };
  };
}

export const SensorsDetails: FunctionComponent<SensorsDetailsProps> = () => {
  const [data, setData] = useState<Measurments>({});

  useEffect(() => {
    const listener = (measurement: Measurment) => {
      setData((data) => {
        return {
          ...data,
          [measurement.rfid]: {
            x: [...(data[measurement.rfid]?.x ?? []), measurement.datetime],
            temperature: {
              y: [
                ...(data[measurement.rfid]?.temperature?.y ?? []),
                measurement.temperature,
              ],
            },
            humidity: {
              y: [
                ...(data[measurement.rfid]?.humidity?.y ?? []),
                measurement.humidity,
              ],
            },
            light: {
              y: [
                ...(data[measurement.rfid]?.light?.y ?? []),
                measurement.light,
              ],
            },
          },
        };
      });
    };
    socket.on(`measurement-020200000000000000004399-update`, listener);
    return () => {
      socket.off(`measurement-020200000000000000004399-update`, listener);
    };
  }, [setData]);

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Table aria-label="Segment Details">
        <TableHead>
          <TableRow>
            <TableCell>Sensor ID</TableCell>
            <TableCell align="right">Temp(C)</TableCell>
            <TableCell align="right">Humidity(%)</TableCell>
            <TableCell align="right">Light(Lux)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(data).map(([key, measurment]) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell align="right">
                <LineChart
                  data={{ x: measurment.x, y: measurment.temperature.y }}
                  dataTitle="temp"
                  graphTitle="Temperature"
                  xAxisTitle="Time"
                  yAxisTitle="C"
                  unit="C"
                />
              </TableCell>
              <TableCell align="right">
                <LineChart
                  data={{ x: measurment.x, y: measurment.humidity.y }}
                  dataTitle="Humidity"
                  graphTitle="Humidity"
                  xAxisTitle="Time"
                  yAxisTitle="%"
                  unit="%"
                />
              </TableCell>
              <TableCell align="right">
                <LineChart
                  data={{ x: measurment.x, y: measurment.light.y }}
                  dataTitle="Light"
                  graphTitle="Light"
                  xAxisTitle="Time"
                  yAxisTitle="Lux"
                  unit="Lux"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
