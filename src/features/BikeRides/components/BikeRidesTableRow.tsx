import { TableCell, TableRow } from "@material-ui/core";
import HumanizeDuration from "humanize-duration";
import React, { useCallback, useMemo } from "react";
import { BikeRideTransformed } from "../interfaces/bike-rides.interfaces";

type Props = {
  ride: BikeRideTransformed;

  onMouseEnter: (ride: BikeRideTransformed) => void;
  onMouseLeave: () => void;
};

export const BikeRidesTableRow = ({
  ride,

  onMouseEnter,
  onMouseLeave,
}: Props) => {
  const tripduration = useMemo(
    () =>
      HumanizeDuration(ride.tripduration * 60 * 1000, {
        units: ["d", "h", "m"],
      }),
    [ride.tripduration]
  );

  const handleMouseEnter = useCallback(() => {
    onMouseEnter(ride);
  }, [onMouseEnter, ride]);

  return (
    <TableRow onMouseEnter={handleMouseEnter} onMouseLeave={onMouseLeave}>
      <TableCell>{ride.starttime.toLocaleString()}</TableCell>
      <TableCell>{ride.startStationName}</TableCell>
      <TableCell>{ride.stoptime.toLocaleString()}</TableCell>
      <TableCell>{ride.endStationName}</TableCell>
      <TableCell>{tripduration}</TableCell>
    </TableRow>
  );
};
