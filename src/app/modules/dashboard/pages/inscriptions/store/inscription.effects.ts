import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of, forkJoin } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { InscriptionsService } from '../../../../../core/services/inscriptions.service';
import { StudentsService } from '../../../../../core/services/students.service';
import { CoursesService } from '../../../../../core/services/courses.service';
import { Inscription } from '../models/index';


@Injectable()
export class InscriptionEffects {
  private actions$ = inject(Actions);

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadInscriptions),
      concatMap(() =>
        this.inscriptionsService.getInscriptions().pipe(
          //Si el servicio responde ok
          map((inscriptions) => InscriptionActions.loadInscriptionsSuccess({ data: inscriptions }) ),
          //Si el servicio da error
          catchError((error) => of(InscriptionActions.loadInscriptionsFailure({ error })))
        )
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        // EMPTY.pipe(
        //   map(data => InscriptionActions.loadInscriptionsSuccess({ data })),
        //   catchError(error => of(InscriptionActions.loadInscriptionsFailure({ error }))))
      )
    );
  });

  createInscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscriptionActions.createInscription),
      concatMap((action) =>
        this.inscriptionsService.createInscription(action.data).pipe(
          concatMap((newInscription) =>
            forkJoin([
              this.studentsService.getStudentById(newInscription.studentId || ''),
              this.coursesService.getCourseById(newInscription.courseId || '')
            ]).pipe(
              map(([student, course]) =>
                InscriptionActions.createInscriptionSuccess({
                  data: { ...newInscription, student, course }
                })
              )
            )
          ),
          catchError((error) => of(InscriptionActions.createInscriptionFailure({ error })))
        )
      )
    )
  );

  updateInscriptionById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.updateInscriptionById),
      concatMap((action) =>
        this.inscriptionsService.updateInscriptionById(action.id, action.data).pipe(
          concatMap((updatedInscription) =>
            forkJoin([
              this.studentsService.getStudentById(updatedInscription.studentId || ''),
              this.coursesService.getCourseById(updatedInscription.courseId || '')
            ]).pipe(
              map(([student, course]) =>
                InscriptionActions.updateInscriptionByIdSuccess({
                  data: { ...updatedInscription, student, course }
                })
              )
            )
          ),
          catchError((error) => of(InscriptionActions.updateInscriptionByIdFailure({ error })))
        )
      )
    );
  });


  deleteInscriptionById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.deleteInscriptionById),
      concatMap((action) =>
        this.inscriptionsService.deleteInscriptionById(action.id).pipe(
          //Si el servicio responde ok
          map(() => InscriptionActions.deleteInscriptionByIdSuccess({id: action.id}) ),
          //Si el servicio da error
          catchError((error) => of(InscriptionActions.deleteInscriptionByIdFailure({ error })))
        )
      )
    );
  });

  constructor(
    // private actions$: Actions,
    private inscriptionsService: InscriptionsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService
  ) {}
}
