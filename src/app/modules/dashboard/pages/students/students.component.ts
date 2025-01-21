import { Component } from '@angular/core';
import { Student } from './models';
import { generateId } from '../../../../shared/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  students: Student[] = [
    {
      id: 1,
      name: 'John',
      lastName: 'Doe'
    },
    {
      id: 2,
      name: 'Hannah',
      lastName: 'Smith'
    }
  ];
  addStudentForm: FormGroup;
  editingStudentId: number | null = null;

  constructor(private fb: FormBuilder, private matDialog: MatDialog ) {
    this.addStudentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]]
    });
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
      this.students = this.students.filter((item) => item.id != id);
    }
  }

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
