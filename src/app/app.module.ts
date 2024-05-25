import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
//angular material ui
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { EmployeeComponent } from './employee/employee.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
//highchart
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';
//observable

import {HttpClientModule} from '@angular/common/http';
import { SearchPipe } from './pipes/search.pipe'
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    EmployeeComponent,
    AddComponent,
    EditComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HighchartsChartModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
