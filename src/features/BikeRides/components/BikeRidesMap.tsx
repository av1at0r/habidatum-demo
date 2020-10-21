import React, { useEffect, useMemo } from "react";
import ReactMapGL from "react-map-gl";
import { mapboxToken } from "../../../constants";
import useMapViewport from "../../Map/hooks/useMapViewport";
import useBikeRidesCenter from "../hooks/useBikeRidesCenter";
import { BikeRideTransformed } from "../interfaces/bike-rides.interfaces";
import BikeHighlightedPointsLayer from "./BikeHighlightedPointsLayer";
import BikePointsLayer from "./BikePointsLayer";
import BikePointsSource from "./BikePointsSource";
import { BikeStationsNamesLayer } from "./BikeStationsNamesLayer";

interface Props {
  rides?: BikeRideTransformed[];
  selectedRide?: BikeRideTransformed;
  className?: string;
}

const defaultRides: BikeRideTransformed[] = [];

export const BikeRidesMap = ({
  rides = defaultRides,
  selectedRide,
  className,
}: Props) => {
  const {
    viewState,
    handleViewChanged,
    setPartialViewportState,
  } = useMapViewport({ zoom: 11 });

  const center = useBikeRidesCenter(rides);
  useEffect(() => {
    if (center) {
      setPartialViewportState(center);
    }
  }, [center, setPartialViewportState]);

  const selectedRidesData = useMemo(
    () => (selectedRide ? [selectedRide] : undefined),
    [selectedRide]
  );

  return (
    <ReactMapGL
      {...viewState}
      mapboxApiAccessToken={mapboxToken}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      width="100%"
      height="100%"
      className={className}
      onViewStateChange={handleViewChanged}
    >
      <BikePointsSource rides={rides}>
        <BikePointsLayer />
      </BikePointsSource>
      {selectedRidesData && selectedRide && (
        <>
          <BikePointsSource rides={selectedRidesData}>
            <BikeHighlightedPointsLayer
              rides={rides}
              selectedRide={selectedRide}
            />
          </BikePointsSource>
          <BikePointsSource rides={selectedRidesData}>
            <BikeStationsNamesLayer />
          </BikePointsSource>
        </>
      )}
    </ReactMapGL>
  );
};
