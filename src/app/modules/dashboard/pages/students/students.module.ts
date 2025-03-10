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
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { studentFeature } from './store/student.reducer';
import { StudentEffects } from './store/student.effects';
import { inscriptionFeature } from '../inscriptions/store/inscription.reducer';
import { InscriptionEffects } from '../inscriptions/store/inscription.effects';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentDialogComponent,
    StudentDetailComponent
  ],
  providers: [],
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
    StoreModule.forFeature(studentFeature),
    StoreModule.forFeature(inscriptionFeature),
    EffectsModule.forFeature([StudentEffects, InscriptionEffects]),
],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
