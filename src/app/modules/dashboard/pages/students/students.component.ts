import { Component, OnInit } from '@angular/core';
import { Student } from './models';
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
  displayedColumns: string[] = ['id', 'name', 'mail', 'phone', 'edit', 'view', 'delete'];
  students: Student[] = [];
  selectedStudent: any;

  addStudentForm: FormGroup;
  editingStudentId: number | null = null;

  isLoading = false;
  hasError = false;

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private studentService: StudentsService
  ) {
    this.addStudentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.maxLength(12)]]
    });
  }

  ngOnInit(): void {
    // this.studentService.getStudents().subscribe(data => {
    //   this.students = data;
    // })
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

  onCreateStudent() {
    if (this.addStudentForm.invalid) {
      this.addStudentForm.markAllAsTouched();
    } else {
      console.log(this.addStudentForm.value);
      this.students = [
        ...this.students,
        {
          id: generateId(this.students),
          ...this.addStudentForm.value,
        },
      ];
      this.addStudentForm.reset();
    }
  }

  onDelete(id:number){
    if(confirm('¿Estás seguro de eliminar este estudiante?')){
      // this.students = this.students.filter((item) => item.id != id);
      this.students = this.students.filter((student) => student.id !== id);
    }
  }

  // getStudentDetails(id: number){
  //   this.studentService.getStudentById(id).subscribe(student => {
  //     this.selectedStudent = student;
  //   })
  // }

  onEdit(student: Student): void{
    this.editingStudentId = student.id;
    this.matDialog
      .open(StudentDialogComponent, {
        data: student,
      })
      .afterClosed()
      .subscribe({
        next: (valorFormulario) => {
          if (!!valorFormulario) {
            // Logica de editar
            this.students = this.students.map((student) =>
              student.id === this.editingStudentId
                ? { ...student, ...valorFormulario }
                : student
            );
            this.editingStudentId = null;
          }
        },
      });
  }
}
