import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../../../shared/shared.module";
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentDialogComponent
  ],
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    SharedModule,
    MatDialogModule,
    MatDatepickerModule,
],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
