import { DetailedNodeResult } from "./detailed-node-result";


export interface TriangleResult {
  number: number;
  nodes: DetailedNodeResult[];
  sxx: number;
  syy: number;
  txy: number;
}
