import * as THREE from 'three';

const supportMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const height = 2;
const radious = 1;
const segments = 10;

function supportTemplate(x: number, y: number, scale: number,rotation: number) : THREE.Geometry {
  const geometry = new THREE.ConeGeometry(radious, height, segments);
  geometry.rotateZ(rotation);
  geometry.scale(scale, scale, scale);
  geometry.translate(x, y - height * scale / 2, 0);

  return geometry;
}

export const support0deg = (x: number, y: number, scale: number) => {
  const geometry = supportTemplate(x, y, scale, 0);
  const support = new THREE.Mesh(geometry, supportMaterial);
  return support;
}

export const support90deg = (x: number, y: number, scale: number) => {
  const geoemtry = supportTemplate(x, y, scale, Math.PI / 2);
  geoemtry.translate(radious * scale, height * scale / 2, 0);

  const support = new THREE.Mesh(geoemtry, supportMaterial);
  return support;
}
