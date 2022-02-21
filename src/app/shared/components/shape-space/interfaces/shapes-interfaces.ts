export type Dimensions = 'width' | 'height';

export interface BoxResponse {
  id: number;
  itemDescription: string;
  color: string;
  x: number;
  y: number;
  z: number;
}

export type GenericArray<T> = {
  [K in keyof T]: T[K];
};
