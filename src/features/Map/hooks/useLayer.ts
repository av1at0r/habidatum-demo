import { Layer } from "mapbox-gl";
import { useEffect } from "react";
import { MapState } from "./useMap";

type Options = {
  source: string;
  id: string;
  type: Layer["type"];
  paint?: Layer["paint"];
};

export default function useLayer(
  { map, loaded }: MapState,
  { source, id, type, paint }: Options
) {
  useEffect(() => {
    if (!map.current || !loaded) {
      return;
    }
    const layer = map.current.getLayer(id);
    if (layer) {
      map.current.removeLayer(id);
    }
    map.current.addLayer({
      id,
      source,
      type,
      paint,
    });
  }, [id, loaded, map, paint, source, type]);
}
