import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { serverClientService } from "../../services/ServerClientService";

export const SegmentDetails = ({ rfId }: { rfId: string }) => {
  const { data } = useQuery(["segment", rfId], () =>
    serverClientService.getSegmentInfo(rfId)
  );
  if(!data) {
    return <Paper>Loading...</Paper>
  }

  return (
    <Paper>
      <Table aria-label="Segment Details">
        <TableHead>
          <TableRow>
            <TableCell>Resource</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">{data.rfid}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Material</TableCell>
            <TableCell align="right">{data.material}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Manufacturer</TableCell>
            <TableCell align="right">{data.manufacturer}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mounted Time</TableCell>
            <TableCell align="right">{data.mountedTime}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Unmounted Time</TableCell>
            <TableCell align="right">{data.demountedTime.length? data.demountedTime : '-'}</TableCell>
          </TableRow>
          <TableRow sx={{ border: 0 }}>
            <TableCell>Usage Time</TableCell>
            <TableCell align="right">{data.usedTime.length ? data.usedTime : 'Still Used'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};
