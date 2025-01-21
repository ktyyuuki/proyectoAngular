import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

@Component({
  selector: 'app-student-dialog',
  standalone: false,

  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss'
})
export class StudentDialogComponent {
  editStudentForm: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Student
  ){
    this.editStudentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]]
    });

    if(!!data) {
      this.isEditing = true;
      this.editStudentForm.patchValue({
        name: data.name,
        lastName: data.lastName,
      });
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
