import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SectionComponent } from './home/result/result.component';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { CalculationsComponent } from './home/creator/calculations/calculations.component';
import { CheckBoxComponent } from './home/creator/calculations/check-box/check-box.component';
import { GeometryComponent } from './home/creator/geometry/geometry.component';
import { CreatorComponent } from './home/creator/creator.component';
import { PropertiesComponent } from './home/creator/properties/properties.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SectionComponent,
    CreatorComponent,
    GeometryComponent,
    PropertiesComponent,
    CalculationsComponent,
    CheckBoxComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]),
    AccordionModule,
    PanelModule,
    TabViewModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    ButtonModule,
    MessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
