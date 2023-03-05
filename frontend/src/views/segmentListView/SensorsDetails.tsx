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
import {useQuery} from "@tanstack/react-query";
import {serverClientService} from "../../services/ServerClientService";

const socket = io(BACKEND_URL);

export interface SensorsDetailsProps {}
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

const initialMeasurment: MeasurmentData ={
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
interface MeasurmentsData {
  [key: string]: MeasurmentData;
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

const joinMeasurementsData = (a:MeasurmentsData, b:MeasurmentsData): MeasurmentsData => {
  const keys = new Set<string>([...(Object.keys(a)), ...(Object.keys(b))])
  const result: MeasurmentsData = {}
  for (const key of keys) {
    result[key] = {
      x: [...((a[key] ?? initialMeasurment).x), ...(b[key] ?? initialMeasurment).x],
      temperature: {
        y: [...((a[key] ?? initialMeasurment).temperature.y), ...((b[key] ?? initialMeasurment).temperature.y)]
      },
      humidity: {
        y: [...((a[key] ?? initialMeasurment).humidity.y), ...((b[key] ?? initialMeasurment).humidity.y)]
      },
      light: {
        y: [...((a[key] ?? initialMeasurment).light.y), ...((b[key] ?? initialMeasurment).light.y)]
      },
    }
  }
  return result;
}

export const SensorsDetails: FunctionComponent<SensorsDetailsProps> = () => {
  const [data, setData] = useState<MeasurmentsData>({});
  const {data: srvMeasurements} = useQuery(["measurments2"], async () => {
    const srv = await serverClientService.getAllMeasurements();
    // console.log('reducing', srv)
    return srv.filter(({isApproximated}) => !isApproximated).reduce((previousValue, currentValue) => {
      // console.log('reduce', currentValue)
      return {
        ...previousValue,
        [currentValue.rfid] : mergeMeasurments(previousValue[currentValue.rfid] ?? initialMeasurment, currentValue)
      }
    }, {} as MeasurmentsData)
  })

  useEffect(() => {
    const listener = (measurement: Measurment) => {
      if(!measurement.isApproximated) {
        setData((data) => {
          return {
            ...data,
            [measurement.rfid]: mergeMeasurments(data[measurement.rfid] ?? initialMeasurment, measurement),
          };
        });
      }
    };
    socket.on('measurement-update', listener);
    return () => {
      socket.off('measurement-update', listener);
    };
  }, [setData]);
  console.log(srvMeasurements)
  const joinedData = joinMeasurementsData(srvMeasurements ?? {}, data)

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
          {Object.entries(joinedData).map(([key, measurement]) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell align="right">
                <LineChart
                  data={{ x: measurement.x, y: measurement.temperature.y }}
                  dataTitle="temp"
                  graphTitle="Temperature"
                  xAxisTitle="Time"
                  yAxisTitle="C"
                  unit="C"
                />
              </TableCell>
              <TableCell align="right">
                <LineChart
                  data={{ x: measurement.x, y: measurement.humidity.y }}
                  dataTitle="Humidity"
                  graphTitle="Humidity"
                  xAxisTitle="Time"
                  yAxisTitle="%"
                  unit="%"
                />
              </TableCell>
              <TableCell align="right">
                <LineChart
                  data={{ x: measurement.x, y: measurement.light.y }}
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
