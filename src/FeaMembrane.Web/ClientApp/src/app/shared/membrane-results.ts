import { NodeResult } from "./node-result";
import { MembraneData } from "./membrane-data";
import { TriangleResult } from "./triangle-result";

export interface MembraneResults {
  txyPercentile005: number;
  txyPercentile095: number;
  syyPercentile005: number;
  syyPercentile095: number;
  sxxPercentile005: number;
  sxxPercentile095: number;
  minTxy: number;
  minSyy: number;
  minSxx: number;
  maxTxy: number;
  maxSyy: number;
  maxSxx: number;
  triangles: TriangleResult[];
  nodes: NodeResult[];
  inputData: MembraneData;
  maxUx: number;
  maxUy: number;
}
