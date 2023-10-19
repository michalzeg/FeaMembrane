import { Injectable } from '@angular/core';
import { TextPosition } from '../shared/text-position';
import { ScaleService } from './scale.service';
import { Point } from '../shared/point';
import * as THREE from 'three';

const textBoxRightMargin = 50;
const textBoxLeftMargin = 10;
const textBoxBottomMargin = 10;
const textBoxTopMargin = 10;

const textHeight = 10;
const textWidth = 10;

@Injectable({
  providedIn: 'root'
})
export class TextService {
  private canvas!: HTMLElement;
  private camera!: THREE.PerspectiveCamera;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private controls!: any;

  private minX!: number;
  private minY!: number;
  private maxX!: number;
  private maxY!: number;
  private width!: number;
  private height!: number;
  private texts: TextPosition[] = [];


  constructor(private readonly scaleService: ScaleService) { }

  initialize(canvas: HTMLElement, camera: THREE.PerspectiveCamera, controls: any) {
    this.canvas = canvas;
    this.camera = camera;
    this.controls = controls;

    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
    this.minX = textBoxLeftMargin;
    this.maxX = this.width - textBoxRightMargin;
    this.minY = textBoxBottomMargin
    this.maxY = this.height - textBoxTopMargin

  }

  addTexts(texts: TextPosition[]) {
    this.texts = texts;
    this.update();
  }

  update(){
    for (let i = 0; i < this.texts.length; i++) {
      const text = this.texts[i];
      this.createText(text);
    }
  }

  clean() {
    const elements = document.querySelectorAll('[id^="triangle"');
    for (let i = 0; i < elements.length; i++) {
      this.canvas.removeChild(elements[i]);
    }
    this.texts = [];
  }

  private createText(text: TextPosition) {
    this.camera.updateMatrixWorld(true);
    this.camera.updateProjectionMatrix();

    if (this.checkPosition(text)) {
      this.createTextElement(text);
    } else {
      this.removeText(text.index);
    }
  }

  private removeText(index: number) {
    const id = this.getId(index);
    const text = this.canvas.querySelector(`#${id}`);
    if (text != null)
      this.canvas.removeChild(text);
  }

  private createTextElement(text: TextPosition) {
    const id = this.getId(text.index);

    let textElement = this.canvas.querySelector(`#${id}`);

    if (!textElement) {
      textElement = document.createElement('div');
      this.canvas.appendChild(textElement);
      this.controls.addElement(textElement);
    }

    const position = this.getTextPosition(text);

    textElement.id = id;
    const y = position.y - textHeight;
    const x = position.x - textWidth;
    const top = `${y}px`;
    const left = `${x}px`;
    const style = `position:absolute; color: black; cursor: default; top: ${top}; left: ${left} `;

    textElement.setAttribute('style', style)

    textElement.innerHTML = text.value.toFixed(2);

  }

  private getTextPosition(point: Point) {
    const translation = this.scaleService.getCentreTranslation();
    const x = point.x - translation.x;
    const y = point.y - translation.y;

    const p = new THREE.Vector3(x, y, 0);
    const vector = p.project(this.camera);

    vector.x = (vector.x + 1) / 2 * this.width;
    vector.y = -(vector.y - 1) / 2 * this.height;
    return vector;
  }

  private checkPosition(point: Point) {
    const position = this.getTextPosition(point);
    const x = position.x;
    const y = position.y;

    const result = (x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY);
    return result;
  }

  private getId(index: number) {
    return `triangle${index}`;
  }
}
