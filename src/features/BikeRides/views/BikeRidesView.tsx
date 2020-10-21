import { createStyles, makeStyles, Table, TableBody } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { BikeRidesMap } from "../components/BikeRidesMap";
import { BikeRidesTableHeader } from "../components/BikeRidesTableHeader";
import { BikeRidesTableRow } from "../components/BikeRidesTableRow";
import useBikeRidesData from "../hooks/useBikeRidesData";
import { BikeRideTransformed } from "../interfaces/bike-rides.interfaces";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    tableWrapper: {
      width: "50%",
      maxHeight: "100vh",
      overflowY: "auto",
      flexShrink: 0,
    },
    mapWrapper: {
      position: "relative",
      flexShrink: 0,
      flexGrow: 1,
    },
    map: {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100vh",
    },
  })
);

export default function BikeRidesView() {
  const { data } = useBikeRidesData();

  const classes = useStyles();
  const [selectedRide, setSelectedRide] = useState<BikeRideTransformed>();

  const clearSelection = useCallback(() => {
    setSelectedRide(undefined);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table>
          <BikeRidesTableHeader />
          <TableBody>
            {data?.data.map((item, index) => (
              <BikeRidesTableRow
                key={`${item.starttime.toISOString()} ${item.bikeid}`}
                ride={item}
                onMouseEnter={setSelectedRide}
                onMouseLeave={clearSelection}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className={classes.mapWrapper}>
        <BikeRidesMap
          rides={data?.data}
          className={classes.map}
          selectedRide={selectedRide}
        />
      </div>
    </div>
  );
}
