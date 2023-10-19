
export interface MembraneProperties {
  modulusOfElasticity: number;
  poissonsRatio: number;
  thickness: number;
}

export  const initialProperties: MembraneProperties = {
  modulusOfElasticity:200,
  poissonsRatio: 0.25,
  thickness: 200
};
