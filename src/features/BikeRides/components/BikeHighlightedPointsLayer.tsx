import React, { useMemo } from "react";
import { Layer, LayerProps } from "react-map-gl";
import { BikeRideTransformed } from "../interfaces/bike-rides.interfaces";

const pointPaint: Layer["props"]["paint"] = {
  "circle-radius": 7,
  "circle-color": "#FF0000",
};

type Props = {
  rides: BikeRideTransformed[];
  selectedRide: BikeRideTransformed;
} & Omit<LayerProps, "type" | "paint">;

const BikeHighlightedPointsLayer = ({ rides, selectedRide, ...props }: Props) => {
  const scale = useMemo(() => {
    const minRideDuration = Math.min(...rides.map((item) => item.tripduration));
    const maxRideDuration = Math.max(...rides.map((item) => item.tripduration));

    return (
      ((selectedRide.tripduration - minRideDuration) /
        (maxRideDuration - minRideDuration)) *
        (2 - 1) +
      1
    );
  }, [rides, selectedRide.tripduration]);

  const paint = useMemo(() => {
    return {
      ...pointPaint,
      "circle-radius": (pointPaint["circle-radius"] as number) * scale,
    };
  }, [scale]);

  return <Layer {...props} type="circle" paint={paint} />;
};

export default BikeHighlightedPointsLayer;
