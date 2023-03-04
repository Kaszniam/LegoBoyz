import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { FunctionComponent } from "react";

export interface SensorsDetailsProps {}

export const SensorsDetails: FunctionComponent<SensorsDetailsProps> = ({}) => {
  return (
      <Paper sx={{padding: '1rem'}}><Table aria-label="Segment Details">
        <TableHead>
          <TableRow>
            <TableCell>Resource</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">1234-ASDF-4567</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Material</TableCell>
            <TableCell align="right">Wood</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Manufacturer</TableCell>
            <TableCell align="right">Samsung</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mounted Time</TableCell>
            <TableCell align="right">01-11-2017</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Demounted Time</TableCell>
            <TableCell align="right">01-11-2020</TableCell>
          </TableRow>
          <TableRow sx={{border: 0}}>
            <TableCell>Used Time</TableCell>
            <TableCell align="right">3 years, 2 months</TableCell>
          </TableRow>
        </TableBody>
      </Table></Paper>
  );
};
