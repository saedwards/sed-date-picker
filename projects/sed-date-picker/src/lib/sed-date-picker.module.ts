import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SedDatePickerComponent } from './sed-date-picker.component';

@NgModule({
  declarations: [
    SedDatePickerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    SedDatePickerComponent
  ]
})
export class SedDatePickerModule { }

