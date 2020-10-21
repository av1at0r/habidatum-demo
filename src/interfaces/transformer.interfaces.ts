export type TransformerFunctionKey = string | number;
export type TransformerFunction = (value: any) => any;
export type TransformerFunctions<T extends TransformerFunctionKey> = Partial<
  Record<T, TransformerFunction>
>;
