import { useMemo } from "react";
import { BikeRideTransformed } from "../interfaces/bike-rides.interfaces";

export default function useBikeRidesCenter(rides: BikeRideTransformed[]) {
  return useMemo(() => {
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

    return {
      latitude: minLat + (maxLat - minLat) / 2,
      longitude: minLong + (maxLong - minLong) / 2,
    };
  }, [rides]);
}
