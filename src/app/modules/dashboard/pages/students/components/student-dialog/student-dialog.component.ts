import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student, STUDENT_GENDER, STUDENT_PROFFILE } from '../../models';

@Component({
  selector: 'app-student-dialog',
  standalone: false,

  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss'
})
export class StudentDialogComponent {
  editStudentForm: FormGroup;
  isEditing = false;
  title = "Agregar Estudiante";

  //Opciones del form
  profiles = STUDENT_PROFFILE;
  genders = STUDENT_GENDER;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data:{ student?: Student; isEditing: boolean }
  ){
    this.isEditing = data.isEditing;

    this.editStudentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.maxLength(12)]],
      profile: [null, [Validators.required]],
      gender: [null, [Validators.required]]
    });

    // if(!!data) {
    //   this.isEditing = true;
    //   this.editStudentForm.patchValue({
    //     name: data.name,
    //     lastName: data.lastName,
    //     email: data.email,
    //     phone: data.phone,
    //     profile: data.profile,
    //     gender: data.gender
    //   });
    // }

    if (this.isEditing && data.student) {
      this.title = "Editar Estudiante";
      this.editStudentForm.patchValue(data.student);
    }
  }

  onSubmit() {
    if (this.editStudentForm.invalid) {
      this.editStudentForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.editStudentForm.value);
      this.editStudentForm.reset();
    }
  }
}
