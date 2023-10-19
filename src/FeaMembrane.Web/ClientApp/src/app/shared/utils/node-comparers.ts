import { NodeResult } from "../node-result";
import * as THREE from 'three';
import { isApproximatelyEqualTo } from "./is-approximately-equal-to";
import { Point } from "../point";

export const nodeVertexComparer = (node: NodeResult, vertex: THREE.Vector3 | Point) => isApproximatelyEqualTo(node.x, vertex.x) && isApproximatelyEqualTo(node.y, vertex.y)
