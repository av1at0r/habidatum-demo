import { TableCell, TableRow } from "@material-ui/core";
import HumanizeDuration from "humanize-duration";
import React, { useCallback, useMemo } from "react";
import { BikeRideTransformed } from "../interfaces/bike-rides.interfaces";

type Props = {
  ride: BikeRideTransformed;
  index: number;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
};

export const BikeRidesTableRow = ({
  ride,
  index,
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
    onMouseEnter(index);
  }, [index, onMouseEnter]);

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
