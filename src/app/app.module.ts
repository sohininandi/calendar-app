import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ViewCalendarComponent } from './component/view-calendar/view-calendar.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';
@NgModule({
  declarations: [
    AppComponent,
    ViewCalendarComponent,
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule
  ],
  providers: [BsModalService,BsDatepickerConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
