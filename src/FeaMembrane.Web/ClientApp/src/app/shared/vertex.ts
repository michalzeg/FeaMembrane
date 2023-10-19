import { Point } from "./point";

export interface Vertex extends Point {
  number: number;
  loadX: number;
  loadY: number;
  supportX: boolean;
  supportY: boolean;
}

export const empty = (number: number) => ({
  number,
  x: 0,
  y: 0,
  supportX: false,
  supportY: false,
  loadX: 0,
  loadY: 0
});

export const initialVerticies = [
  {
    x: 0,
    y: 0,
    supportX: false,
    supportY: true,
    loadX: 0,
    loadY: 0
  },
  {
    x: 50,
    y: 0,
    supportX: true,
    supportY: true,
    loadX: 0,
    loadY: 0
  },
  {
    x: 50,
    y: 20,
    supportX: true,
    supportY: false,
    loadX: 0,
    loadY: 0
  },
  {
    x: 25,
    y: 20,
    supportX: false,
    supportY: false,
    loadX: 0,
    loadY: -2000
  },
  {
    x: 0,
    y: 20,
    supportX: false,
    supportY: false,
    loadX: 0,
    loadY: 0
  }
];
