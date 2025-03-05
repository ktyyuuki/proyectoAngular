import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CourseStudentsComponent } from './pages/course-detail/components/course-students/course-students.component';
import { StoreModule } from '@ngrx/store';
import { courseFeature } from './store/course.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './store/course.effects';
import { InscriptionEffects } from '../inscriptions/store/inscription.effects';
import { inscriptionFeature } from '../inscriptions/store/inscription.reducer';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesTableComponent,
    CourseFormDialogComponent,
    CourseDetailComponent,
    CourseStudentsComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    StoreModule.forFeature(courseFeature),
    StoreModule.forFeature(inscriptionFeature),
    EffectsModule.forFeature([CourseEffects, InscriptionEffects]),
  ]
})
export class CoursesModule { }
