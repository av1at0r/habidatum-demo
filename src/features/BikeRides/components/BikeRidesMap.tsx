import mapboxgl, { LngLatLike } from "mapbox-gl";
import React, { useCallback, useEffect, useMemo } from "react";
import { mapboxToken } from "../../../constants";
import useMap from "../../Map/hooks/useMap";
import { PointSource } from "../../Map/hooks/usePointsSource";
import useBikePoints from "../hooks/useBikePoints";
import { BikeRideTransformed } from "../interfaces/bike-rides.interfaces";

mapboxgl.accessToken = mapboxToken;

interface Props extends React.HTMLAttributes<HTMLElement> {
  rides?: BikeRideTransformed[];
  selectedRideIndex?: number;
}

const defaultRides: BikeRideTransformed[] = [];

export const BikeRidesMap = ({
  rides = defaultRides,
  selectedRideIndex,
  ...props
}: Props) => {
  const { map, mapContainer, loaded } = useMap<HTMLDivElement>({
    style: "mapbox://styles/mapbox/streets-v11",
  });

  const center: LngLatLike | undefined = useMemo(() => {
    if (rides.length === 0) {
      return;
    }
    const longs = [
      ...rides.map((item) => item.startStationLongitude),
      ...rides.map((item) => item.endStationLongitude),
    ];
    const lats = [
      ...rides.map((item) => item.startStationLatitude),
      ...rides.map((item) => item.endStationLatitude),
    ];
    const minLong = Math.min(...longs);
    const maxLong = Math.max(...longs);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    const center: LngLatLike = {
      lon: minLong + (maxLong - minLong) / 2,
      lat: minLat + (maxLat - minLat) / 2,
    };
    return center;
  }, [rides]);

  const { minRideDuration, maxRideDuration } = useMemo(() => {
    const minRideDuration = Math.min(...rides.map((item) => item.tripduration));
    const maxRideDuration = Math.max(...rides.map((item) => item.tripduration));

    return { minRideDuration, maxRideDuration };
  }, [rides]);

  const getRideSсale = useCallback(
    (rideDuration: number) => {
      return (
        ((rideDuration - minRideDuration) /
          (maxRideDuration - minRideDuration)) *
          (2 - 1) +
        1
      );
    },
    [maxRideDuration, minRideDuration]
  );

  useEffect(() => {
    if (map.current && center) {
      map.current.setZoom(13);
      map.current.setCenter(center);
    }
  }, [center, map, rides, rides.length]);

  const {
    setHighlightedPointScale,
    points,
    highlightedPoints,
  } = useBikePoints({ map, loaded });

  useEffect(() => {
    if (typeof selectedRideIndex === "undefined") {
      return;
    }
    const ride = rides[selectedRideIndex];
    setHighlightedPointScale(getRideSсale(ride.tripduration));
  }, [getRideSсale, rides, selectedRideIndex, setHighlightedPointScale]);

  useEffect(() => {
    if (!loaded) {
      return;
    }
    const coordinates: Array<PointSource> = [];
    const highlightedCoordinates: Array<PointSource> = [];
    rides.forEach((ride, index) => {
      if (index === selectedRideIndex) {
        highlightedCoordinates.push({
          coordinates: {
            lat: ride.startStationLatitude,
            lon: ride.startStationLongitude,
          },
          properties: {
            title: ride.startStationName,
          },
        });
        highlightedCoordinates.push({
          coordinates: {
            lat: ride.endStationLatitude,
            lon: ride.endStationLongitude,
          },
          properties: {
            title: ride.endStationName,
          },
        });
      } else {
        coordinates.push({
          coordinates: {
            lat: ride.startStationLatitude,
            lon: ride.startStationLongitude,
          },
          properties: {
            title: "",
          },
        });
        coordinates.push({
          coordinates: {
            lat: ride.endStationLatitude,
            lon: ride.endStationLongitude,
          },
          properties: {
            title: "",
          },
        });
      }
    });
    points.setPoints(coordinates);
    highlightedPoints.setPoints(highlightedCoordinates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    highlightedPoints.setPoints,
    loaded,
    points.setPoints,
    rides,
    selectedRideIndex,
  ]);

  return <div {...props} ref={mapContainer} />;
};
