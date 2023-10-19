import * as THREE from 'three';
import { MembraneResults } from '../membrane-results';
import { StressType } from '../stress-type';
import { getCentreResult, getSmoothResult } from '../utils/result-utils';
import { getColor } from '../utils/color-utils';


const materialTriangle = new THREE.MeshBasicMaterial({
  vertexColors: THREE.VertexColors,
  side: THREE.DoubleSide
});

const materialLine = new THREE.LineBasicMaterial({ color: 0x808080 });

export const getResultMesh = (result: MembraneResults, stressType: StressType, smoothing: boolean): THREE.Mesh => {
  const meshGeometry = new THREE.Geometry();
  const nodes = result.nodes;

  for (const node of nodes) {
    const point = { x: node.x, y: node.y };
    meshGeometry.vertices.push(new THREE.Vector3(point.x, point.y, 0.0));
  }

  for (const triangle of result.triangles) {
    meshGeometry.faces.push(new THREE.Face3(triangle.nodes[0].number - 1, triangle.nodes[1].number - 1, triangle.nodes[2].number - 1));

    const stresses = smoothing ? getSmoothResult(triangle, stressType) : getCentreResult(triangle, stressType);

    const color0 = getColor(result, stresses.resultType0, stressType);
    const color1 = getColor(result, stresses.resultType1, stressType);
    const color2 = getColor(result, stresses.resultType2, stressType);

    const currentFaceIndex = meshGeometry.faces.length - 1;
    meshGeometry.faces[currentFaceIndex].vertexColors[0] = new THREE.Color(color0);
    meshGeometry.faces[currentFaceIndex].vertexColors[1] = new THREE.Color(color1);
    meshGeometry.faces[currentFaceIndex].vertexColors[2] = new THREE.Color(color2);
  }

  const mesh = new THREE.Mesh(meshGeometry, materialTriangle);
  return mesh;
}

export const getResultMeshLines = (result: MembraneResults): THREE.LineSegments => {
  const lineGeometry = new THREE.Geometry();

  for (const triangle of result.triangles) {
    const point0 = { x: triangle.nodes[0].x, y: triangle.nodes[0].y };
    const point1 = { x: triangle.nodes[1].x, y: triangle.nodes[1].y };
    const point2 = { x: triangle.nodes[2].x, y: triangle.nodes[2].y };

    lineGeometry.vertices.push(new THREE.Vector3(point0.x, point0.y, 0.0));
    lineGeometry.vertices.push(new THREE.Vector3(point1.x, point1.y, 0.0));
    lineGeometry.vertices.push(new THREE.Vector3(point1.x, point1.y, 0.0));
    lineGeometry.vertices.push(new THREE.Vector3(point2.x, point2.y, 0.0));
    lineGeometry.vertices.push(new THREE.Vector3(point2.x, point2.y, 0.0));
    lineGeometry.vertices.push(new THREE.Vector3(point0.x, point0.y, 0.0));
  }
  const line = new THREE.LineSegments(lineGeometry, materialLine);
  return line;
}



