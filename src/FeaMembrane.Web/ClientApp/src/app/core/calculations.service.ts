import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MembraneResults } from '../shared/membrane-results';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { MembraneGeometry } from '../shared/membrane-input-data';
import { MembraneData } from "../shared/membrane-data";
import { MembraneProperties } from '../shared/membrane-properties';
import { DrawingService } from './drawing.service';
import { DrawingSettingType } from '../shared/drawing-setting-type';
import { StressType } from '../shared/stress-type';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  private geometry!: MembraneGeometry;
  private properties!: MembraneProperties;

  constructor(private readonly http: HttpClient, private readonly drawingService: DrawingService) { }

  async calculate(): Promise<boolean> {
    const request = {
      vertices: this.geometry.vertices,
      edges: this.geometry.edges,
      properties: this.properties,
      areaFactor: this.properties.meshScalingFactor
    } as MembraneData;

    try {
      const result = await firstValueFrom(this.http.post<MembraneResults>(environment.url, request));
      this.drawingService.setResults(result);
      return true;
    }
    catch (error) {
      return false;
    }
  }

  setGeometry(geometry: MembraneGeometry) {
    this.geometry = geometry;
    this.drawingService.setGeometry(geometry);
  }

  setProperties(properties: MembraneProperties) {
    this.properties = properties;
  }

  setStressType(type: StressType) {
    this.drawingService.setStress(type);
  }

  setDrawingSettings(types: DrawingSettingType[]) {
    this.drawingService.setDrawingSettings(types);
  }

  clearResults() {
    this.drawingService.clearResult();
  }

}
