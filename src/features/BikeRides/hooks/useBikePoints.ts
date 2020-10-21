import { Layer } from "mapbox-gl";
import { useCallback, useState } from "react";
import useLayer from "../../Map/hooks/useLayer";
import { MapState } from "../../Map/hooks/useMap";
import usePointsSource from "../../Map/hooks/usePointsSource";
import useSymbolLayer from "../../Map/hooks/useSymbolLayer";

const defaultPointPaint = {
  "circle-radius": 5,
  "circle-color": "#007cbf",
};

const highlightedLayerLayout: Layer["layout"] = {
  "text-field": ["get", "title"],
  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
  "text-offset": [0, 2],
  "text-anchor": "bottom",
  "text-ignore-placement": true,
};

const defaultHighlightPointRadius = 7;

export default function useBikePoints(map: MapState) {
  const points = usePointsSource(map, { sourceId: "points", layerId: "point" });
  const highlightedPoints = usePointsSource(map, {
    sourceId: "highlighted-points",
    layerId: "highlighted-point",
  });

  useLayer(map, {
    id: "point",
    source: "points",
    paint: defaultPointPaint,
    type: "circle",
  });

  const [highlightedPaint, setHighlightedPaint] = useState<Layer["paint"]>({
    "circle-radius": defaultPointPaint["circle-radius"],
    "circle-color": "#FF0000",
  });

  const [highlightedLayerPaint, setHighlightedLayerPaint] = useState<
    Layer["paint"]
  >({
    "text-halo-color": "rgba(255, 255, 255, 0.8)",
    "text-halo-width": 10,
  });

  useLayer(map, {
    id: "highlighted-point",
    source: "highlighted-points",
    paint: highlightedPaint,
    type: "circle",
  });

  useSymbolLayer(map, {
    id: "highlighted-label",
    source: "highlighted-points",
    layout: highlightedLayerLayout,
    paint: highlightedLayerPaint,
  });

  const setHighlightedPointScale = useCallback((scale: number) => {
    setHighlightedPaint({
      "circle-radius": defaultHighlightPointRadius * scale,
      "circle-color": "#FF0000",
    });
    //Обновляем стиль, paint чтобы перерисовать
    //layer с лейблами и они оказались над точками
    setHighlightedLayerPaint({
      "text-halo-color": "rgba(255, 255, 255, 0.8)",
      "text-halo-width": 10,
    });
  }, []);

  return { points, highlightedPoints, setHighlightedPointScale };
}
