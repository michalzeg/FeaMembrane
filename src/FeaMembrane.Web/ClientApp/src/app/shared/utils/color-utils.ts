import { MembraneResults } from '../membrane-results';
import { StressType } from '../stress-type';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Rainbow = require('rainbowvis.js');

const range = 100;
const minColor = '00FF00';
const middleColor = 'FFFF00';
const maxColor = 'FF0000';

const rainbow = new Rainbow();
rainbow.setSpectrum(minColor, middleColor, maxColor);
rainbow.setNumberRange(0, range);


const getPercentile05 = (result: MembraneResults, stressType: StressType): number => {
  switch (stressType) {
    case 'Sxx':
      return result.sxxPercentile005;
    case 'Syy':
      return result.syyPercentile005;
    case 'Txy':
      return result.txyPercentile005;
  }
}

const getPercentile95 = (result: MembraneResults, stressType: StressType): number => {
  switch (stressType) {
    case 'Sxx':
      return result.sxxPercentile095;
    case 'Syy':
      return result.syyPercentile095;
    case 'Txy':
      return result.txyPercentile095;
  }
}

export const getColor = (result: MembraneResults, value: number, stressType: StressType): string => {
  const percentile095 = getPercentile95(result, stressType);
  const percentile005 = getPercentile05(result, stressType);
  const valueRange = percentile095 - percentile005;

  let valueToCalculations;

  if (value <= percentile005) {
    valueToCalculations = percentile005;
  } else if (value >= percentile095) {
    valueToCalculations = percentile095;
  } else {
    valueToCalculations = value;
  }
  const valueTransformed = valueToCalculations - percentile005;

  const colorIndex = Math.round((valueTransformed / valueRange) * range);
  const color = rainbow.colourAt(colorIndex);
  return '#' + color;
}


