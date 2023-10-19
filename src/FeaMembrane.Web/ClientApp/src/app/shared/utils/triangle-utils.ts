import { NodeResult } from "../node-result";
import { Point } from "../point";
import { TriangleResult } from "../triangle-result";


export const getTriangleCenter = (triangle: TriangleResult, scale: number): Point => {
  const nodes = triangle.nodes;

  const p0 = totalPosition(nodes[0], scale) ;
  const p1 =  totalPosition(nodes[1], scale);
  const p2 =  totalPosition(nodes[2], scale) ;

  const x = (p0.x + p1.x + p2.x) / 3;
  const y = (p0.y + p1.y + p2.y) / 3;

  return { x, y };
}

const totalPosition = (node: NodeResult, scale: number): Point =>{
  return {
    x: node.x + node.ux * scale,
    y: node.y + node.uy * scale
  };
}
