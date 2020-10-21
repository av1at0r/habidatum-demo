import mapboxgl, { Map, MapboxOptions } from "mapbox-gl";
import { RefObject, useEffect, useRef, useState } from "react";

export type MapState = {
  map: RefObject<Map | undefined>;
  loaded: boolean;
};

export default function useMap<T extends HTMLElement>(
  options: Omit<MapboxOptions, "container">
) {
  const map = useRef<Map>();
  const mapContainer = useRef<T>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) {
      return;
    }
    const createdMap = (map.current = new mapboxgl.Map({
      ...options,
      container: mapContainer.current,
    }));

    map.current.on("load", () => {
      setLoaded(true);
    });

    return () => {
      createdMap.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, Object.values(options));

  return { map, mapContainer, loaded };
}
