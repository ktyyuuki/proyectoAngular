import { Component } from '@angular/core';
import { Student } from './models';
import { generateId } from '../../../../shared/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder ) {
    this.addStudentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]]
    });
  }

  // onSubmit(){
  //   if(this.addStudentForm.invalid){
  //     this.addStudentForm.markAllAsTouched();
  //   } else {
  //     alert("Se ha creado un nuevo estudiante");
  //     this.addStudentForm.reset();
  //   }
  // }

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
}
