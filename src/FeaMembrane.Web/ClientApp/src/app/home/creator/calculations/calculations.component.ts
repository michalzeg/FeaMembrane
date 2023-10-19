import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'primeng/api/message';
import { CalculationProgressType } from 'src/app/shared/calculation-progress-type';
import { CalculationsService } from 'src/app/core/calculations.service';
import { StressType } from 'src/app/shared/stress-type';
import { DrawingSettingType } from 'src/app/shared/drawing-setting-type';
import { NotificationService } from 'src/app/core/notification.service';
import { Subscription, tap } from 'rxjs';

const progressMessageMap = new Map<CalculationProgressType, Message>([
  ['Error', { severity: 'error', summary: 'Error', detail: 'An error has occured' }],
  ['OutOfDate', { severity: 'warn', summary: 'Warning', detail: 'Results are NOT up to date' }],
  ['Processing', { severity: 'info', summary: 'Info', detail: 'Processing...' }],
  ['Success', { severity: 'success', summary: 'Success', detail: 'Results are up to date' }]
]);

const buttonStyleMap = new Map<CalculationProgressType, string>([
  ['Error', 'p-button-lg p-button-danger'],
  ['OutOfDate', 'p-button-lg p-button-warning'],
  ['Processing', 'p-button-lg p-button-info'],
  ['Success', 'p-button-lg p-button-success']
]);

const buttonIconMap = new Map<CalculationProgressType, string>([
  ['Error', 'pi pi-cog'],
  ['OutOfDate', 'pi pi-cog'],
  ['Processing', 'pi pi-cog pi-spin'],
  ['Success', 'pi pi-cog']
]);


@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.css']
})
export class CalculationsComponent implements OnInit, OnDestroy {

  private notificationChangedSub!: Subscription;

  messages: Message[] = [];
  buttonStyle = '';
  buttonClass = '';

  selectedStress: StressType = 'Sxx';
  drawingSettings: DrawingSettingType[] = ['Loads', 'Supports', 'Smoothing'];

  constructor(private readonly calculationsService: CalculationsService, private readonly notificationService: NotificationService) {
    this.notificationChangedSub = this.notificationService.inputChanged$.pipe(
      tap(() => this.setStyles('OutOfDate')),
      tap(()=>this.calculationsService.clearResults())
    ).subscribe();
  }

  ngOnInit(): void {
    this.setStyles('OutOfDate');
  }

  ngOnDestroy(): void {
    this.notificationChangedSub?.unsubscribe();
  }

  init(): void {
    this.calculationsService.setStressType(this.selectedStress);
    this.calculationsService.setDrawingSettings(this.drawingSettings);
  }

  async calculate() {

      this.setStyles('Processing');

      const result = await this.calculationsService.calculate();

      const style = result ? 'Success' : 'Error';
      this.setStyles(style);
  }

  setStressType(type: StressType){
    this.selectedStress = type;
    this.calculationsService.setStressType(type);
  }

  setAdditonalSettings(type: DrawingSettingType, enabled: boolean) {
    this.drawingSettings = enabled ? this.drawingSettings.concat(type) : this.drawingSettings.filter(e=>e !== type);
    this.calculationsService.setDrawingSettings(this.drawingSettings);
  }

  private setStyles(type: CalculationProgressType) {
    this.buttonClass = buttonIconMap.get(type) ?? '';
    this.buttonStyle = buttonStyleMap.get(type) ?? '';
    this.messages = [progressMessageMap.get(type) ?? {}];
  }

}
