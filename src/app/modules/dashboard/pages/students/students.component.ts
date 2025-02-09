import { Component, OnInit } from '@angular/core';
import { Student, STUDENT_GENDER, STUDENT_PROFFILE } from './models';
import { generateId } from '../../../../shared/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { StudentsService } from '../../../../core/services/students.service';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'mail','gender', 'phone', 'edit', 'view', 'delete'];
  students: Student[] = [];
  // selectedStudent: Student;

  //Opciones del form
  profiles = STUDENT_PROFFILE;
  genders = STUDENT_GENDER;

  editingStudentId: number | null = null;

  isLoading = false;
  hasError = false;

  constructor(
    private matDialog: MatDialog,
    private studentService: StudentsService
  ) {}

  ngOnInit(): void {
    this.loadStudentsObs();
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
    this.isLoading = true;

    this.matDialog
      .open(StudentDialogComponent, { data: { student, isEditing }})
      .afterClosed()
      .subscribe({
        next: (valorFormulario) => {
          if(!!valorFormulario){
            // Editar
            if(isEditing){
              this.students = this.students.map((s) =>
                s.id === student!.id // asegura que no sea null
                  ? { ...s, ...valorFormulario }
                  : s
              );
            } else {
              this.isLoading = true;
              // Crear
              this.studentService.addStudent(valorFormulario).subscribe((newStudent) => {
                this.students = [...this.students, newStudent];
                this.isLoading = false;
              });
              // this.students = [
              //   ...this.students,
              //   {
              //     id: generateId(this.students),
              //     ...valorFormulario,
              //   },
              // ];
            }
          }
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      })
  }

  onDelete(id:number): void {
    if(confirm('¿Estás seguro de eliminar este estudiante?')){
      this.students = this.students.filter((student) => student.id !== id);
    }
  }

  // getStudentDetails(id: number){
  //   this.studentService.getStudentById(id).subscribe(student => {
  //     this.selectedStudent = student;
  //   })
  // }

}
