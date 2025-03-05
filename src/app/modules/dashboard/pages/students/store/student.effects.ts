import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { StudentActions } from './student.actions';
import { StudentsService } from '../../../../../core/services/students.service';


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


  constructor(private studentsService: StudentsService) {}
}
