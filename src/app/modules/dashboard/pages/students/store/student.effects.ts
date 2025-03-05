import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of, forkJoin } from 'rxjs';
import { StudentActions } from './student.actions';
import { StudentsService } from '../../../../../core/services/students.service';
import { CoursesService } from '../../../../../core/services/courses.service';


@Injectable()
export class StudentEffects {
  private actions$ = inject(Actions);

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.loadStudents),
      concatMap(() =>
        this.studentsService.getStudentsObservable().pipe(
          map((students) => StudentActions.loadStudentsSuccess({ data: students })),
          catchError(error => of(StudentActions.loadStudentsFailure({ error }))))
      )
    );
  });

  addStudent$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.addStudent),
      concatMap((action) =>
        this.studentsService.addStudent(action.data).pipe(
          map((students) => StudentActions.addStudentSuccess({ data: students })),
          catchError(error => of(StudentActions.addStudentFailure({ error }))))
      )
    );
  });

  updateStudentById$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.updateStudentById),
      concatMap((action) =>
        this.studentsService.updateStudentById(action.id, action.data).pipe(
          //Si el servicio responde ok
          map((user) => StudentActions.updateStudentByIdSuccess({data: user}) ),
          //Si el servicio da error
          catchError((error) => of(StudentActions.updateStudentByIdFailure({ error })))
        )
      )
    );
  });

  getStudentById$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.getStudentById),
      concatMap((action) =>
        this.studentsService.getStudentById(action.id).pipe(
          map((course) => StudentActions.getStudentByIdSuccess({ data: course })),
          catchError(error => of(StudentActions.getStudentByIdFailure({ error }))))
      )
    );
  });

  deleteStudentById$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.deleteStudentById),
      concatMap((action) =>
        this.studentsService.deleteStudentById(action.id).pipe(
          //Si el servicio responde ok
          map(() => StudentActions.deleteStudentByIdSuccess({id: action.id}) ),
          //Si el servicio da error
          catchError((error) => of(StudentActions.deleteStudentByIdFailure({ error })))
        )
      )
    );
  });

  loadStudentsByIds$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.loadStudentsByIds),
      // tap((action) => console.log("📌 Acción `loadStudentsByIds` con IDs:", action.studentIds)),
      concatMap((action) =>
        this.studentsService.getStudentsByIds(action.studentIds).pipe(
          // tap((students) => console.log("📌 Estudiantes obtenidos del servicio:", students)),
          map((students) => StudentActions.loadStudentsByIdsSuccess({ data: students })),
          catchError((error) => {
            // console.error("❌ Error en `loadStudentsByIds$`:", error);
            return of(StudentActions.loadStudentsByIdsFailure({ error }));
          })
        )
      )
    );
  });

  loadStudentCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.loadStudentCourses),
      concatMap(({ courseIds }) =>
        forkJoin(courseIds.map((id) => this.coursesService.getCourseById(id))).pipe(
          map((courses) => StudentActions.loadStudentCoursesSuccess({ courses })),
          catchError((error) => of(StudentActions.loadStudentCoursesFailure({ error })))
        )
      )
    )
  );

  constructor(private studentsService: StudentsService, private coursesService: CoursesService) {}
}
