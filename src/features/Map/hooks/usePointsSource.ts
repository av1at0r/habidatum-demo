import { GeoJSONSource, GeoJSONSourceRaw } from "mapbox-gl";
import { useEffect, useState } from "react";
import { MapState } from "./useMap";

type Options = {
  sourceId: string;
  layerId: string;
};

export type PointSource = {
  coordinates: { lon: number; lat: number };
  properties: GeoJSON.Feature["properties"];
};

export default function usePointsSource(
  { map, loaded }: MapState,
  options: Options
) {
  const [points, setPoints] = useState<Array<PointSource>>([]);

  useEffect(() => {
    if (!map.current || !loaded) {
      return;
    }

    function getPointsSource(): GeoJSONSourceRaw {
      return {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: points.map((point) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [point.coordinates.lon, point.coordinates.lat],
            },
            properties: point.properties,
          })),
        },
      };
    }

    const source = map.current.getSource(options.sourceId) as GeoJSONSource;
    if (source) {
      source.setData(getPointsSource().data!);
    } else {
      map.current.addSource(options.sourceId, getPointsSource());
    }
  }, [loaded, map, options.sourceId, points]);

  return { points, setPoints };
}
