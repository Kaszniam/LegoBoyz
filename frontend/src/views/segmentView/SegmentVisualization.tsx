import { styled } from "@mui/material";
import { useEffect } from "react";

function initializeThreeSegmentView(canvasId: string) {
  return null;
}

function dispozeThreeSegmentViewse(id: any) {
  return undefined;
}

export const SegmentVisualization = () => {
  useEffect(() => {
    const id = initializeThreeSegmentView("segment-canvas");
    return () => dispozeThreeSegmentViewse(id);
  });
  return (
    <StyledVisualisation>
      <canvas id="segment-canvas" />
    </StyledVisualisation>
  );
};

const StyledVisualisation = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;

  & #segment-canvas {
    overflow: hidden;
    object-fit: fill;
    width: 100%;
    height: 100%;
    outline: none;
  }
`;
