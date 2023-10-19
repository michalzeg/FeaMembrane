import * as THREE from 'three';
import { Vertex } from '../vertex';
import { pointLoad0deg, pointLoad180deg, pointLoad270deg, pointLoad90deg } from './load-templates';
import { BasePointMesh, createBasePointMesh } from '../utils/base-point-mesh';


export function getLoadMeshes(vertices: Vertex[], scale: number): BasePointMesh[] {
  let result: BasePointMesh[] = [];

  const addToResult = (meshes: THREE.Mesh[], vertex: Vertex) => {
    const baseMeshes = meshes.map(m => createBasePointMesh(m, vertex));
    result = result.concat(baseMeshes);
  }

  const maxLoad = Math.max(...vertices.map(e => [e.loadX, e.loadY]).reduce((p, n) => [...p, ...n]).map(e => Math.abs(e)));

  for (const vertex of vertices) {
    const x = vertex.x;
    const y = vertex.y;

    const lengthScaleX = Math.abs(vertex.loadX) / maxLoad;
    const lengthScaleY = Math.abs(vertex.loadY) / maxLoad;

    if (vertex.loadX > 0) {
      const pointLoad = pointLoad90deg(x, y, lengthScaleX, scale);
      addToResult(pointLoad, vertex);
    } else if (vertex.loadX < 0) {
      const pointLoad = pointLoad270deg(x, y, lengthScaleX, scale);
      addToResult(pointLoad, vertex);
    }

    if (vertex.loadY > 0) {
      const pointLoad = pointLoad0deg(x, y, lengthScaleY, scale);
      addToResult(pointLoad, vertex);
    } else if (vertex.loadY < 0) {
      const pointLoad = pointLoad180deg(x, y, lengthScaleY, scale);
      addToResult(pointLoad, vertex);
    }
  }
  return result;
}
