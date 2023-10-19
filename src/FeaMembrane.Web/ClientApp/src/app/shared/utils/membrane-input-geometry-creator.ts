import { Edge } from "../edge";
import { MembraneGeometry } from "../membrane-input-data";
import { Vertex } from "../vertex";

export const createGeometry = (vertices: Vertex[]): MembraneGeometry => {
  const edges = new Array<Edge>();

  const modifiedVertices = vertices.map(e => ({
    ...e,
    x: e.x * 100,
    y: e.y * 100,
    loadX: e.loadX * 1000,
    loadY: e.loadY * 1000,
  }));

  for (let i = 0; i < modifiedVertices.length - 1; i++) {
    const vertexStart = modifiedVertices[i];
    const vertexEnd = modifiedVertices[i + 1];
    edges.push({
      number: i + 1,
      start: vertexStart,
      end: vertexEnd,
    });
  }

  edges.push({
    number: modifiedVertices.length,
    start: modifiedVertices[modifiedVertices.length - 1],
    end: modifiedVertices[0],
  });

  return {
    vertices: modifiedVertices,
    edges: edges
  };
}
