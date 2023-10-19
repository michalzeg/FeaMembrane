import { Vertex } from "../vertex";
import { support0deg, support90deg } from "./support-templates";
import { BasePointMesh, createBasePointMesh } from "../utils/base-point-mesh";


export const getSupportMeshes = (vertices: Vertex[], scale: number): BasePointMesh[] => {

  const supports = new Array<BasePointMesh>();

  for (const vertex of vertices) {
    const x = vertex.x;
    const y = vertex.y;

    if (vertex.supportX) {
      const supportX = support90deg(x, y, scale);
      const support = createBasePointMesh(supportX, vertex);
      supports.push(support);
    }
    if (vertex.supportY) {
      const supportY = support0deg(x, y, scale);
      const support = createBasePointMesh(supportY, vertex);
      supports.push(support);
    }
  }

  return supports;
}
