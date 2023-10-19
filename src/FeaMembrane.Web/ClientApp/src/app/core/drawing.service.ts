import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';
import * as THREE from 'three';
import { ScaleService } from './scale.service';
import { getGeometryMesh, getPointMeshes } from '../shared/drawing/geometry';
import { getSupportMeshes } from '../shared/drawing/support';
import { getLoadMeshes } from '../shared/drawing/load';
import { MembraneResults } from '../shared/membrane-results';
import { StressType } from '../shared/stress-type';
import { DrawingSettingType } from '../shared/drawing-setting-type';
import { MembraneGeometry } from '../shared/membrane-input-data';
import { getResultMesh, getResultMeshLines } from '../shared/drawing/results';
import { nodeVertexComparer } from '../shared/utils/node-comparers';
import { BasePointMesh } from '../shared/utils/base-point-mesh';
import { TextPosition } from '../shared/text-position';
import { getTriangleCenter } from '../shared/utils/triangle-utils';
import { getCenterValue } from '../shared/utils/result-utils';


@Injectable({
  providedIn: 'root'
})
export class DrawingService {

  private stressType: StressType = 'Sxx'
  private drawingSettings: DrawingSettingType[] = [];

  private result: MembraneResults | null = null;
  private membraneGeometry!: MembraneGeometry;

  constructor(private readonly canvasService: CanvasService, private readonly scale: ScaleService) { }

  private updateDrawing() {
    this.canvasService.clear();
    this.applyGeometry();
    this.applyPoints();
    this.applySupports();
    this.applyLoads();
    this.applyResults();
    this.applyText();
  }

  private applyLoads() {
    if (!this.drawingSettings.includes('Loads')) { return; }
    const loadSacle = this.scale.getPointLoadScale();
    const loads = getLoadMeshes(this.membraneGeometry.vertices, loadSacle);
    this.addToCanvasWithTransformation(loads);
  }

  private applySupports() {
    if (!this.drawingSettings.includes('Supports')) { return; }
    const supportScale = this.scale.getSupportScale();
    const supports = getSupportMeshes(this.membraneGeometry.vertices, supportScale);
    this.addToCanvasWithTransformation(supports);
  }

  private applyPoints() {
    const pointScale = this.scale.getInputPointScale();
    const points = getPointMeshes(this.membraneGeometry.vertices, pointScale);
    this.addToCanvasWithTransformation(points);
  }

  private applyGeometry() {
    if (this.result) {
      return;
    }
    const geometry = getGeometryMesh(this.membraneGeometry.vertices);
    this.addToCanvasWithTransformation([geometry]);
  }

  private applyResults() {
    if (!this.result) {
      return;
    }
    const lines = getResultMeshLines(this.result);
    const smoothing = this.drawingSettings.includes('Smoothing');
    const faces = getResultMesh(this.result, this.stressType, smoothing);

    this.addToCanvasWithTransformation([lines]);
    this.addToCanvasWithTransformation([faces]);
  }

  private applyText() {
    if (!this.result || !this.drawingSettings.includes('Text')) {
      return;
    }

    const displacement = this.drawingSettings.includes('Displacement');
    const scale = displacement ? this.scale.getDisplacementScale() : 0;
    const texts = this.result.triangles.map(e => <TextPosition>({
      index: e.number,
      value: getCenterValue(e, this.stressType),
      ...getTriangleCenter(e, scale)
    }));
    this.canvasService.addTexts(texts);
  }

  private addToCanvasWithTransformation(objects: THREE.Mesh[] | THREE.LineSegments[] | BasePointMesh[]) {

    if (this.drawingSettings.includes('Displacement') && this.result) {
      const scale = this.scale.getDisplacementScale();
      for (const object of objects) {
        const geometry = object.geometry as THREE.Geometry;
        for (const vertex of geometry.vertices) {
          const basePoint = (object as BasePointMesh)?.basePoint ?? vertex;
          const node = this.result.nodes.find(n => nodeVertexComparer(n, basePoint));
          if (!node) { continue; }

          const x = vertex.x + node.ux * scale;
          const y = vertex.y + node.uy * scale;
          vertex.setX(x);
          vertex.setY(y);
        }
      }
    }

    this.canvasService.addObjects(objects)
  }

  setGeometry(membraneGeometry: MembraneGeometry) {
    this.result = null;
    this.membraneGeometry = membraneGeometry;
    this.scale.setMembraneGeometry(membraneGeometry);

    this.updateDrawing();
  }

  setResults(result: MembraneResults) {
    this.scale.setResult(result);
    this.result = result;
    this.updateDrawing();
  }

  setStress(type: StressType) {
    this.stressType = type;
    this.updateDrawing();
  }

  setDrawingSettings(types: DrawingSettingType[]) {
    this.drawingSettings = [...types];
    this.updateDrawing();
  }

  clearResult() {
    if (!this.canvasService.isInitialized()) { return; }
    this.result = null;
    this.updateDrawing();
  }

}
