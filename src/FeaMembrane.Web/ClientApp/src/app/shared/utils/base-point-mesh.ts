import * as THREE from 'three';
import { Point } from '../point';

export class BasePointMesh extends THREE.Mesh{
  basePoint!: Point | null;
}

export const createBasePointMesh = (mesh: THREE.Mesh, basePoint: Point) => {
  const baseMesh = mesh as BasePointMesh;
  baseMesh.basePoint = basePoint;
  return baseMesh;
}
