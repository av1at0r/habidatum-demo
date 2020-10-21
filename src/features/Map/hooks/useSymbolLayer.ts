import { Layer } from "mapbox-gl";
import { useEffect } from "react";
import { MapState } from "./useMap";

type Options = {
  source: string;
  id: string;
  layout?: Layer["layout"];
  paint?: Layer["paint"];
};

export default function useSymbolLayer(
  { map, loaded }: MapState,
  { source, id, layout, paint }: Options
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
      type: "symbol",
      layout,
      paint,
    });
  }, [id, layout, loaded, map, paint, source]);
}
