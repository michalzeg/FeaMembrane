import * as THREE from "three";
import { Vertex } from "../vertex";
import { BasePointMesh, createBasePointMesh } from "../utils/base-point-mesh";

const material = new THREE.MeshBasicMaterial({ color: 0x3276B1 });
const pointMaterial = new THREE.MeshPhongMaterial({ color: 0x3276B1 });
const radious = 1;

export const getGeometryMesh = (nodes: Vertex[]): THREE.Mesh => {
  const shape = new THREE.Shape();

  shape.moveTo(nodes[0].x, nodes[0].y);

  for (let i = 1; i < nodes.length; i++) {
    const node = nodes[i];
    shape.lineTo(node.x, node.y);
  }
  shape.lineTo(nodes[0].x, nodes[0].y);

  const extrudeSettings = {
    steps: 2,
    amount: 0.01,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1
  };

  const meshGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const mesh = new THREE.Mesh(meshGeometry, material);
  return mesh;
}

export const getPointMeshes = (nodes: Vertex[], pointScale: number): BasePointMesh[] => {
  const points: BasePointMesh[] = [];
  for (const node of nodes) {
    const geometry = new THREE.SphereGeometry(radious);

    geometry.scale(pointScale, pointScale, pointScale);
    geometry.translate(node.x, node.y, 0);
    const mesh = new THREE.Mesh(geometry, pointMaterial);

    const point = createBasePointMesh(mesh, node);
    points.push(point);
}
  return points;
}
