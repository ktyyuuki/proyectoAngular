import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Courses } from '../../../courses/models';
import { Student } from '../../../students/models';
import { Inscription } from '../../models';

interface InscriptionEditFormData {
  editInscription?: Inscription;
  students: Student[];
  courses: Courses[];
}

@Component({
  selector: 'app-inscription-edit-form',
  standalone: false,

  templateUrl: './inscription-edit-form.component.html',
  styleUrl: './inscription-edit-form.component.scss'
})
export class InscriptionEditFormComponent {
  editInscriptionForm: FormGroup;
  students: Student[];
  courses: Courses[];

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<InscriptionEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: InscriptionEditFormData
  ){
    this.students = data.students;
    this.courses = data.courses;

    this.editInscriptionForm = this.fb.group({
      studentId: [data.editInscription?.studentId, [Validators.required]],
      courseId: [data.editInscription?.courseId, [Validators.required]]
    })
  }

  onSubmit() : void{
    if (this.editInscriptionForm.invalid) {
      this.editInscriptionForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.editInscriptionForm.value);
      this.editInscriptionForm.reset();
    }
  }
}
