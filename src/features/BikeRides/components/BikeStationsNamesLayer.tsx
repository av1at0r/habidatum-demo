import React, { useMemo } from "react";
import { Layer, LayerProps } from "react-map-gl";

type Props = Omit<LayerProps, "type" | "paint"> & {
  paint?: LayerProps["paint"];
};

export const BikeStationsNamesLayer = ({ layout, paint, ...props }: Props) => {
  layout = useMemo(
    () => ({
      "text-field": ["get", "title"],
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 2],
      "text-anchor": "bottom",

      ...layout,
    }),
    [layout]
  );
  paint = useMemo(
    () => ({
      "text-halo-color": "rgba(255, 255, 255, 0.8)",
      "text-halo-width": 10,
      ...paint,
    }),
    [paint]
  );

  return <Layer {...props} type="symbol" layout={layout} paint={paint} />;
};
