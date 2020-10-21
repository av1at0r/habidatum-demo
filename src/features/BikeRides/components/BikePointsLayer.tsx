import React from "react";
import { Layer, LayerProps } from "react-map-gl";

const pointPaint: Layer["props"]["paint"] = {
  "circle-radius": 5,
  "circle-color": "#007cbf",
};

const BikePointsLayer = (props: Omit<LayerProps, 'type' | 'paint'>) => {
  return <Layer {...props} type="circle" paint={pointPaint} />;
};

export default BikePointsLayer;
