import { Button, styled, TextField, Typography } from "@mui/material";
import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledPageContainer } from "../components/StyledPageContainer";

export const SegmentListView = () => {
  const [rfidValue, setRfidValue] = useState("");
  const navigate = useNavigate();
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    navigate(`/segments/${rfidValue}`);
  };
  return (
    <StyledPageContainer>
      <Typography variant="h5">
        Please use RFID scanner to read RFID.
      </Typography>
      <StyledForm onSubmit={onSubmit}>
        <TextField
          required
          id="rfid"
          label="RFID"
          onChange={(e) => setRfidValue(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Go To
        </Button>
      </StyledForm>
    </StyledPageContainer>
  );
};

const StyledForm = styled('form')`
  padding-top: 2rem;
  display: flex;
  gap: 0.5rem;
`
