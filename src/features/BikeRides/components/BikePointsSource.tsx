import React, { PropsWithChildren, useMemo } from "react";
import { Source } from "react-map-gl";
import { BikeRideTransformed } from "../interfaces/bike-rides.interfaces";

type Props = PropsWithChildren<{
  rides: BikeRideTransformed[];
}>;

export default function BikePointsSource({ rides, children }: Props) {
  const points = useMemo(() => {
    const result: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: [],
    };
    rides.forEach((point) => {
      result.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            point.startStationLongitude,
            point.startStationLatitude,
          ],
        },
        properties: {
          title: point.startStationName,
        },
      });
      result.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [point.endStationLongitude, point.endStationLatitude],
        },
        properties: {
          title: point.endStationName,
        },
      });
    });
    return result;
  }, [rides]);

  return (
    <Source type="geojson" data={points}>
      {children}
    </Source>
  );
}
