import { StressType } from "../stress-type";
import { TriangleResult } from "../triangle-result";
import { TraiangleStress } from "../triangle-stress";

export const getCenterValue = (triangle: TriangleResult, resultType: StressType): number => {
  switch (resultType) {
    case 'Sxx':
      return triangle.sxx;
    case 'Syy':
      return triangle.syy;
    case 'Txy':
      return triangle.txy;
  }
}

export const getCentreResult = (triangle: TriangleResult, resultType: StressType): TraiangleStress => {
  switch (resultType) {
    case 'Sxx':
      return {
        resultType0: triangle.sxx,
        resultType1: triangle.sxx,
        resultType2: triangle.sxx
      };
    case 'Syy':
      return {
        resultType0: triangle.syy,
        resultType1: triangle.syy,
        resultType2: triangle.syy
      };
    case 'Txy':
      return {
        resultType0: triangle.txy,
        resultType1: triangle.txy,
        resultType2: triangle.txy
      };
  }
}

export const getSmoothResult = (triangle: TriangleResult, resultType: StressType): TraiangleStress => {
  switch (resultType) {
    case 'Sxx':
      return {
        resultType0: triangle.nodes[0].avgSxx,
        resultType1: triangle.nodes[1].avgSxx,
        resultType2: triangle.nodes[2].avgSxx
      };
    case 'Syy':
      return {
        resultType0: triangle.nodes[0].avgSyy,
        resultType1: triangle.nodes[1].avgSyy,
        resultType2: triangle.nodes[2].avgSyy
      };
    case 'Txy':
      return {
        resultType0: triangle.nodes[0].avgTxy,
        resultType1: triangle.nodes[1].avgTxy,
        resultType2: triangle.nodes[2].avgTxy
      };
  }
}
