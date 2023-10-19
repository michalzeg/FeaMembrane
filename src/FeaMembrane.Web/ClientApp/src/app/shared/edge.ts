import { Vertex } from "./vertex";


export interface Edge {
  number: number;
  start: Vertex;
  end: Vertex;
}
