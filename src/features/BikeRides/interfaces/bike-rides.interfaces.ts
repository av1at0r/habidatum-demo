export interface BikeRide {
  tripduration: number;
  starttime: string;
  stoptime: string;
  startStationId: number;
  startStationName: string;
  startStationLongitude: number;
  startStationLatitude: number;
  endStationId: number;
  endStationName: string;
  endStationLatitude: number;
  endStationLongitude: number;
  bikeid: number;
  usertype: string;
  birthYear: string;
  gender: number;
}

export interface BikeRideTransformed
  extends Omit<BikeRide, "starttime" | "stoptime"> {
  starttime: Date;
  stoptime: Date;
}
