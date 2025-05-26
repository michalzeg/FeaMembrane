import { MembraneProperties } from "./membrane-properties";
import { MembraneGeometry } from "./membrane-input-data";


export interface MembraneData extends MembraneGeometry {
  properties: MembraneProperties;
  areaFactor: number;
}
