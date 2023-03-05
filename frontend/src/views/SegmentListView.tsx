import { Button, Paper, styled, TextField, Typography } from "@mui/material";
import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledPageContainer } from "../components/StyledPageContainer";
import { BuildingVisualisation } from "./segmentListView/SegmentsVisualization";
import { SensorsDetails } from "./segmentListView/SensorsDetails";

export const SegmentListView = () => {
  const [rfidValue, setRfidValue] = useState("");
  const navigate = useNavigate();
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    navigate(`/segments/${rfidValue}`);
  };
  return (
    <StyledPageContainer>
      <StyledListView>
        <Typography variant="h5">
          Please use RFID scanner to read RFID.
        </Typography>
        <StyledForm onSubmit={onSubmit}>
          <TextField
            required
            id="rfid"
            label="RFID"
            value={rfidValue}
            onChange={(e) => setRfidValue(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Go To
          </Button>
        </StyledForm>
        <Typography variant="h3">Digital Twin Prototype</Typography>
        <BuildingVisualisation onRFID={setRfidValue}  />
        <SensorsDetails />
      </StyledListView>
    </StyledPageContainer>
  );
};

const StyledListView = styled("div")`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  text-align: center;
  h3 {
    margin-bottom: 2rem;
  }
`;

const StyledForm = styled("form")`
  padding-top: 2rem;
  display: flex;
  gap: 0.5rem;
`;
