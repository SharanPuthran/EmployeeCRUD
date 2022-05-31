import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeSearchComponent } from './components/employee-search/employee-search.component';


import { MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeDialogComponent } from './components/employee-dialog/employee-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { GenderPipe } from './gender.pipe';
import {MatIconModule} from '@angular/material/icon';
import { EmployeeDeleteComponent } from './components/employee-delete/employee-delete.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeSearchComponent,
    EmployeeDialogComponent,
    GenderPipe,
    EmployeeDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatMomentDateModule,
    MatIconModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
