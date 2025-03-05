import { Component, OnDestroy, OnInit } from '@angular/core';
import { Courses } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUserAdmin } from '../../../../store/auth/auth.selectors';
import { selectCourses, selectCoursesError, selectIsLoadingCourses } from './store/course.selectors';
import { CourseActions } from './store/course.actions';

@Component({
  selector: 'app-courses',
  standalone: false,

  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit, OnDestroy {
  isAdmin$: Observable<boolean>;

  courses$ : Observable<Courses[]>;
  isLoading$ : Observable<boolean>;
  error$: Observable<unknown>;

  dataSource: Courses[] = [];

  constructor(
    private matDialog: MatDialog,
    private store: Store
  ){
    this.isAdmin$ = this.store.select(selectAuthUserAdmin);
    this.courses$ = this.store.select(selectCourses);
    this.isLoading$ = this.store.select(selectIsLoadingCourses);
    this.error$ = this.store.select(selectCoursesError);
  }

  ngOnDestroy(): void {
    this.store.dispatch(CourseActions.resetState());
  }

  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadCourses());
    this.courses$.pipe(
      tap((courses) => {
        this.dataSource = [...courses];
      })
    ).subscribe();
  }

  openFormDialog(editingCourse?: Courses): void{
    this.matDialog
      .open(CourseFormDialogComponent, {data: {editingCourse} })
      .afterClosed().subscribe({
        next: (data) => {
          if (!!data) {
            if(!!editingCourse){
              this.updateCourse(editingCourse.id, data)
            } else {
              this.addNewCourse(data);
            }
          }
        }
      });
  }

  addNewCourse(data: Omit<Courses, 'id'>): void {
    this.store.dispatch(CourseActions.addCourse({data}));
  }

  updateCourse(id: Courses['id'], data: Partial<Courses>) {
    this.store.dispatch(CourseActions.updateCourseById({id, data}));
  }

  onDelete(id: Courses['id']): void {
    if (confirm("¿Estas seguro que deseas eliminar este curso?")){
      this.store.dispatch(CourseActions.deleteCourseById({id}));
    }
  }
}
