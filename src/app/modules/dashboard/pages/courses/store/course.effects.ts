import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of, forkJoin } from 'rxjs';
import { CourseActions } from './course.actions';
import { CoursesService } from '../../../../../core/services/courses.service';
import { TeachersService } from '../../../../../core/services/teachers.service';


@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.loadCourses),
      concatMap(() =>
        this.coursesService.getCourses().pipe(
          map((courses) => CourseActions.loadCoursesSuccess({ data: courses })),
          catchError(error => of(CourseActions.loadCoursesFailure({ error }))))
      )
    );
  });

  addCourse$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.addCourse),
      concatMap((action) =>
        this.coursesService.addCourse(action.data).pipe(
          concatMap((newCourse) =>
            this.teachersService.getTeacherById(newCourse.teacherId).pipe(
              map((teacher) => ({...newCourse, teacher}))
            )
          ),
          map((completeCourse) => CourseActions.addCourseSuccess({ data: completeCourse })),
          catchError(error => of(CourseActions.addCourseFailure({ error }))))
      )
    );
  });

  updateCourseById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.updateCourseById),
      concatMap((action) =>
        this.coursesService.updateCourseById(action.id, action.data).pipe(
          concatMap((updatedCourse) =>
            forkJoin({
              teacher: updatedCourse.teacherId ? this.teachersService.getTeacherById(updatedCourse.teacherId) : of(null),
              course: of(updatedCourse)
            }).pipe(
              map(({ teacher, course }) => ({
                ...course,
                teacher: teacher || undefined
              }))
            )
          ),
          map((courseWithTeacher) => CourseActions.updateCourseByIdSuccess({ data: courseWithTeacher })),
          catchError(error => of(CourseActions.updateCourseByIdFailure({ error })))
        )
      )
    );
  });

  getCourseById$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.getCourseById),
      concatMap((action) =>
        this.coursesService.getCourseById(action.id).pipe(
          map((course) => CourseActions.getCourseByIdSuccess({ data: course })),
          catchError(error => of(CourseActions.getCourseByIdFailure({ error }))))
      )
    );
  });


  deleteCourseById$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.deleteCourseById),
      concatMap((action) =>
        this.coursesService.deleteCourseById(action.id).pipe(
          map(() => CourseActions.deleteCourseByIdSuccess({ id: action.id })),
          catchError(error => of(CourseActions.deleteCourseByIdFailure({ error }))))
      )
    );
  });


  constructor(
    private coursesService: CoursesService,
    private teachersService:TeachersService
  ) {}
}
