import {
  TransformerFunctionKey,
  TransformerFunctions
} from "../interfaces/transformer.interfaces";

export default function createCsvTransformerFunction<
  T extends TransformerFunctionKey
>(transfomerFunctions: TransformerFunctions<T>) {
  return (value: any, key: T) => {
    const transofrmFunction = transfomerFunctions[key];
    if (transofrmFunction) {
      return transofrmFunction(value);
    }
    return value;
  };
}
