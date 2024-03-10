type SnakeToCamel<S extends string> = S extends `${infer Prefix}_${infer Rest}`
  ? `${Prefix}${Capitalize<SnakeToCamel<Rest>>}`
  : S;

export type SnakePropsToCamelProps<T> = {
  [K in keyof T as K extends string ? SnakeToCamel<K> : K]: T[K];
};
