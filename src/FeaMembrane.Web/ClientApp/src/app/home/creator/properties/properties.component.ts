import { Component, OnInit } from '@angular/core';
import { CalculationsService } from 'src/app/core/calculations.service';
import { NotificationService } from 'src/app/core/notification.service';
import { initialProperties } from 'src/app/shared/membrane-properties';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  properties = initialProperties;

  constructor(private readonly calculationService: CalculationsService, private readonly notificationService: NotificationService){}

  ngOnInit(): void {
    this.change();
  }

  change(){
    const modifiedProperties = {
      ...this.properties,
      modulusOfElasticity: this.properties.modulusOfElasticity * 1000
    };
    this.calculationService.setProperties(modifiedProperties);
    this.notificationService.notifyInputChanged();
  }

}
