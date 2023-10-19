import * as THREE from 'three';

const material = new THREE.MeshPhongMaterial({ color: 0x9370DB });

const headRadious = 1;
const headHeight = 2;
const bodyRadious = 0.2;
const bodyHeight = 5;


const createHead = (x: number, y: number, scale: number, rotation: number) => {
  const geometry = new THREE.ConeGeometry(headRadious, headHeight, 10);
  geometry.scale(scale, scale, scale);
  geometry.translate(x, -headHeight * scale / 2 +y,0);
  geometry.rotateZ(rotation);
  const cone = new THREE.Mesh(geometry, material);
  return cone;
}

const createBody = (x: number, y: number, lengthScale: number, scale: number, rotation: number) => {
  const geometry = new THREE.CylinderGeometry(bodyRadious, bodyRadious, bodyHeight * lengthScale, 10);
  geometry.scale(scale, scale, scale);
  geometry.translate(x,-bodyHeight / 2 * scale * lengthScale - headHeight * scale + y,0);
  geometry.rotateZ(rotation);
  const cylinder = new THREE.Mesh(geometry, material);
  return cylinder;
}

export const pointLoadTemplate = (x: number, y: number, lengthScale: number, scale: number, rotation: number): THREE.Mesh[] => {
  const group = [];
  const body = createBody(x, y, lengthScale, scale, rotation);
  const head = createHead(x, y, scale, rotation);
  group.push(body);
  group.push(head);
  return group;
}

export const pointLoad0deg = (x: number, y: number, lengthScale: number, scale: number) => {
  const pointLoad = pointLoadTemplate(x, y, lengthScale, scale, 0);
  return pointLoad;
}

export const pointLoad90deg = (x: number, y: number, lengthScale: number, scale: number) => {
  const meshes = pointLoadTemplate(y, -x, lengthScale, scale, Math.PI / 2);

  return meshes;
}

export const pointLoad180deg = (x: number, y: number, lengthScale: number, scale: number) => {
  const meshes = pointLoadTemplate(-x, -y, lengthScale, scale, Math.PI);

  return meshes;
}

export const pointLoad270deg = (x: number, y: number, lengthScale: number, scale: number) => {
  const meshes = pointLoadTemplate(-y, x, lengthScale, scale, - Math.PI / 2);

  return meshes;
}
