import { Component, ViewChild } from '@angular/core';
import { GeometryComponent } from './geometry/geometry.component';
import { CalculationsComponent } from './calculations/calculations.component';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent {
  @ViewChild('geometryRef', { read: GeometryComponent }) geometryComponent!: GeometryComponent;
  @ViewChild('calculationsRef', { read: CalculationsComponent }) calculationsComponent!: CalculationsComponent;

  init(): void {
    this.geometryComponent.onChange();
    this.calculationsComponent.init();
  }
}
