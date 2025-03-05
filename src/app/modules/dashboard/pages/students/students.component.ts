import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student, STUDENT_GENDER, STUDENT_PROFFILE } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { StudentsService } from '../../../../core/services/students.service';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUserAdmin, selectAuthUserProfile } from '../../../../store/auth/auth.selectors';
import { selectIsLoadingStudents, selectStudents, selectStudentsError } from './store/student.selectors';
import { StudentActions } from './store/student.actions';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit, OnDestroy{
  // displayedColumns: string[] = ['id', 'name', 'mail','gender', 'phone', 'edit', 'view', 'delete'];
  displayedColumns: string[] = [];
  isAdmin$: Observable<boolean>;

  students$: Observable<Student[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;

  students: Student[] = [];
  editingStudentId: number | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private matDialog: MatDialog,
    private studentService: StudentsService,
    private store: Store
  ) {
    this.isAdmin$ = this.store.select(selectAuthUserAdmin);

    this.students$ = this.store.select(selectStudents);
    this.isLoading$ = this.store.select(selectIsLoadingStudents);
    this.error$ = this.store.select(selectStudentsError);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(StudentActions.resetState());
  }

  ngOnInit(): void {
    this.isAdmin$
    .pipe(takeUntil(this.destroy$)) // Se desuscribe cuando el componente se destruye
    .subscribe(isAdmin => {
      this.displayedColumns = this.getDisplayedColumns(isAdmin);
    });

    this.store.dispatch(StudentActions.loadStudents());
    this.students$.pipe(
      tap((students) => {
        this.students = [...students];
      })
    ).subscribe();
  }

  getDisplayedColumns(isAdmin: boolean) : string[] {
    const columns = ['id', 'name', 'mail','gender', 'phone', 'view']; // Columnas Base
    if(isAdmin){
      columns.push('edit', 'delete');
    }
    return columns;
  }

  openFormStudent(student?: Student): void{
    const isEditing = !!student;

    this.matDialog
      .open(StudentDialogComponent, { data: { student, isEditing }})
      .afterClosed()
      .subscribe({
        next: (valorFormulario) => {
          if (!!valorFormulario) {
            if (isEditing) {
              this.updateStudentById(student.id, valorFormulario);
            } else {
              this.createStudent(valorFormulario);
            }
          }
        },
        error: () => {}
      })
  }

  createStudent(data: Omit<Student, 'id'>): void {
    this.store.dispatch(StudentActions.addStudent({data}));
  }

  updateStudentById(id: Student['id'], data: Partial<Student>): void {
    this.store.dispatch(StudentActions.updateStudentById({id, data}));
  }

  onDelete(id: Student['id']): void {
    if(confirm('¿Estás seguro de eliminar este estudiante?')){
      this.store.dispatch(StudentActions.deleteStudentById({id}));
    }
  }
}
