import { Component, OnInit } from '@angular/core';
import { CalculationsService } from 'src/app/core/calculations.service';
import { NotificationService } from 'src/app/core/notification.service';
import { createGeometry } from 'src/app/shared/utils/membrane-input-geometry-creator';
import { Vertex, empty, initialVerticies } from 'src/app/shared/vertex';

@Component({
  selector: 'app-geometry',
  templateUrl: './geometry.component.html',
  styleUrls: ['./geometry.component.css']
})
export class GeometryComponent implements OnInit {

  public vertices: Vertex[] = [];

  constructor(private readonly calculationService: CalculationsService, private readonly notificationService: NotificationService) {

  }
  ngOnInit(): void {
    this.vertices = initialVerticies.map((e, i) => ({ number: i, ...e }));
  }

  onChange() {
    if (!this.validate()) {
      return;
    }
    const geometry = createGeometry(this.vertices);
    this.calculationService.setGeometry(geometry);
    this.notificationService.notifyInputChanged();
  }

  onRemove(index: number) {
    this.vertices = this.vertices.filter(e=>e.number !== index).map((e,i)=> ({...e, number: i}));
    this.onChange();
  }

  addRow() {
    const max = Math.max(...this.vertices.map(e=>e.number)) + 1;
    this.vertices = [...this.vertices, empty(max)];
    this.onChange();
  }

  private validate(): boolean {
    const result = this.vertices.every(v =>
      Number.isFinite(v.x) &&
      Number.isFinite(v.y) &&
      Number.isFinite(v.loadX) &&
      Number.isFinite(v.loadY)
    );
    return result;
  }


}
