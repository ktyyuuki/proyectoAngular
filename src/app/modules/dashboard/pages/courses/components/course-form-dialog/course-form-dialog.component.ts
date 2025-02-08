import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Courses } from '../../models';

interface CourseFormDialogData {
  editingCourse?: Courses;
}

@Component({
  selector: 'app-course-form-dialog',
  standalone: false,

  templateUrl: './course-form-dialog.component.html',
  styleUrl: './course-form-dialog.component.scss'
})
export class CourseFormDialogComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CourseFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: CourseFormDialogData
  ) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]]
    });

    if (!!data && !!data.editingCourse) {
      this.courseForm.patchValue(data.editingCourse);
    }
  }

  onConfirm(): void {
    if(this.courseForm.invalid){
      this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.courseForm.value);
    }
  }
}
