import { Injectable } from '@angular/core';
import { MembraneResults } from '../shared/membrane-results';
import { MembraneGeometry } from '../shared/membrane-input-data';

@Injectable({
  providedIn: 'root'
})
export class ScaleService {
  membraneGeometry!: MembraneGeometry;
  result!: MembraneResults;

  maxX!: number;
  minX!: number;
  maxY!: number;
  minY!: number;
  centreX!: number;
  centreY!: number;
  maxLoad!: number;

  maxDimension!: number;

  initialize(width: number, height: number) {
    this.maxDimension = Math.max(width, height);
  }

  setMembraneGeometry(membraneGeometry: MembraneGeometry) {
    this.membraneGeometry = membraneGeometry;
    this.calculateExtremes();
    this.calculateMaxLoad();
  }

  setResult(result: MembraneResults) {
    this.result = result;
  }

  getCentreTranslation() {
    return {
      x: this.centreX,
      y: this.centreY
    };
  }

  getSupportScale() {
    const factor = 0.02;
    return this.maxDimension * factor;
  }

  getPointLoadScale() {
    const factor = 0.02;
    return this.maxDimension * factor;
  }

  getDisplacementScale() {
    const max = Math.max(this.result.maxUx, this.result.maxUy);
    const disp = 0.1 * this.maxDimension;
    const scale = disp / max;
    return scale;
  }

  getPointLoadLengthScale(loadValue: number) {
    const scale = Math.abs(loadValue) / this.maxLoad;
    return scale;
  }

  getCameraZ() {
    const factor = 2;

    const sectionWidth = this.maxX - this.minX;
    const sectionHeight = this.maxY - this.minY;
    const positionZ = Math.max(sectionWidth, sectionHeight);
    return positionZ * factor;
  }

  getInputPointScale() {
    const factor = 0.01;
    return this.maxDimension * factor;
  }

  private calculateExtremes() {
    const xs = this.membraneGeometry.vertices.map((v) => v.x);
    const ys = this.membraneGeometry.vertices.map((v) => v.y);
    this.maxX = Math.max(...xs);
    this.minX = Math.min(...xs);
    this.maxY = Math.max(...ys);
    this.minY = Math.min(...ys);

    const dx = this.maxX - this.minX;
    const dy = this.maxY - this.minY;
    this.maxDimension = Math.max(dx, dy);

    this.centreX = this.minX + (this.maxX - this.minX) / 2;
    this.centreY = this.minY + (this.maxY - this.minY) / 2;
  }

  private calculateMaxLoad() {
    const xLoads = this.membraneGeometry.vertices.map(v => Math.abs(v.loadX));
    const yLoads = this.membraneGeometry.vertices.map(v => Math.abs(v.loadY));
    const loads = xLoads.concat(yLoads);
    this.maxLoad = Math.max(...loads);
  }

}
