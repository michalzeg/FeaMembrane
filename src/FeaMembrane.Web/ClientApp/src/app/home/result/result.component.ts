import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { CanvasService } from 'src/app/core/canvas.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class SectionComponent implements AfterViewInit {
  constructor(private readonly drawing: CanvasService, private readonly el: ElementRef) { }
  ngAfterViewInit(): void {
    const canvasElement = (this.el.nativeElement as Element).querySelector('.canvas') as HTMLElement;
    this.drawing.initialize(canvasElement);
  }
}
