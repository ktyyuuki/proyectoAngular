import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student, STUDENT_GENDER, STUDENT_PROFFILE } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { StudentsService } from '../../../../core/services/students.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUserAdmin, selectAuthUserProfile } from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit, OnDestroy{
  // displayedColumns: string[] = ['id', 'name', 'mail','gender', 'phone', 'edit', 'view', 'delete'];
  displayedColumns: string[] = [];
  students: Student[] = [];
  isAdmin$: Observable<boolean>;

  //Opciones del form
  profiles = STUDENT_PROFFILE;
  genders = STUDENT_GENDER;

  editingStudentId: number | null = null;

  isLoading = false;
  hasError = false;

  private destroy$ = new Subject<void>();

  constructor(
    private matDialog: MatDialog,
    private studentService: StudentsService,
    private store: Store
  ) {
    this.isAdmin$ = this.store.select(selectAuthUserAdmin);
  }

  ngOnInit(): void {
    this.loadStudentsObs();

    this.isAdmin$
    .pipe(takeUntil(this.destroy$)) // Se desuscribe cuando el componente se destruye
    .subscribe(isAdmin => {
      this.displayedColumns = this.getDisplayedColumns(isAdmin);
      // console.log('Admin:', isAdmin, 'Columns:', this.displayedColumns);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDisplayedColumns(isAdmin: boolean) : string[] {
    const columns = ['id', 'name', 'mail','gender', 'phone', 'view']; // Columnas Base
    if(isAdmin){
      columns.push('edit', 'delete');
    }
    return columns;
  }

  loadStudentsObs(): void {
    this.isLoading = true;
    this.studentService.getStudentsObservable().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error) => {
        this.hasError = true;
        alert(error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
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
              this.studentService.updateStudentById(student!.id, valorFormulario).subscribe({
                next: (updatedStudents) => {
                  this.students = updatedStudents;
                  this.isLoading = false;
                },
                error: (err) => {
                  console.error("Error al actualizar el estudiante:", err);
                  this.isLoading = false;
                }
              });
            } else {
              this.studentService.addStudent(valorFormulario).subscribe((newStudent) => {
                this.students = [...this.students, newStudent];
                this.isLoading = false;
              });
            }
          }
        },
        error: () => {}
      })
  }

  onDelete(id: Student['id']): void {
    if(confirm('¿Estás seguro de eliminar este estudiante?')){
      this.students = this.students.filter((student) => student.id !== id);
    }
  }
}
