
export interface MembraneProperties {
  modulusOfElasticity: number;
  poissonsRatio: number;
  thickness: number;
  meshScalingFactor: number;
}

export const initialProperties: MembraneProperties = {
  modulusOfElasticity: 200,
  poissonsRatio: 0.25,
  thickness: 200,
  meshScalingFactor: 0.01
};
