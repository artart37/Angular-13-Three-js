import { ColorRepresentation } from 'three';

export type Dimensions = 'width' | 'height';

export interface BoxResponse {
  id: number;
  itemDescription: string;
  color: ColorRepresentation;
  x: number;
  y: number;
  z: number;
}

export type GenericArray<T> = {
  [K in keyof T]: T[K];
};
