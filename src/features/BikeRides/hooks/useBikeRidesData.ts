import { parse, ParseResult } from "papaparse";
import { useQuery } from "react-query";
import camelize from "../../../utils/camelize";
import createCsvTransformerFunction from "../../../utils/createCsvTransformerFunction";
import { bikesTransformFunctions } from "../data/bikesTransformFunctions";
import { BikeRideTransformed } from "../interfaces/bike-rides.interfaces";

export const BIKE_RIDES_KEY = "bike-rides";

const transform = createCsvTransformerFunction(bikesTransformFunctions);

function fetchBikeRidesData() {
  return new Promise<ParseResult<BikeRideTransformed>>((resolve, reject) => {
    parse<BikeRideTransformed>(`${process.env.PUBLIC_URL}/bike-rides.csv`, {
      download: true,
      dynamicTyping: true,
      complete: resolve,
      error: reject,
      header: true,
      transformHeader: camelize,
      transform,
    });
  });
}

export default function useBikeRidesData() {
  return useQuery([BIKE_RIDES_KEY], fetchBikeRidesData, {
    staleTime: Infinity,
  });
}
