import { TransformerFunctions } from "../../../interfaces/transformer.interfaces";
import { BikeRide } from "../interfaces/bike-rides.interfaces";

export const bikesTransformFunctions: TransformerFunctions<keyof BikeRide> = {
  starttime: (value: string) => new Date(value),
  stoptime: (value: string) => new Date(value),
};
