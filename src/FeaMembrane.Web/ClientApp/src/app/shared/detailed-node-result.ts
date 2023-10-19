import { NodeResult } from "./node-result";

export interface DetailedNodeResult extends NodeResult {
  avgSxx: number;
  avgSyy: number;
  avgTxy: number;
}
