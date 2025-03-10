import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Courses } from '../../models';
import { Teacher } from '../../../teachers/models/teacher';
import { TeachersService } from '../../../../../../core/services/teachers.service';

interface CourseFormDialogData {
  editingCourse?: Courses;
}

@Component({
  selector: 'app-course-form-dialog',
  standalone: false,

  templateUrl: './course-form-dialog.component.html',
  styleUrl: './course-form-dialog.component.scss'
})
export class CourseFormDialogComponent implements OnInit {
  courseForm: FormGroup;
  title: string = "Crear Nuevo Curso";
  teachers: Teacher[] = [];

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CourseFormDialogComponent>,
    private teachersService: TeachersService,
    @Inject(MAT_DIALOG_DATA) private data?: CourseFormDialogData
  ) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]],
      hours: ['', [Validators.required]],
      nClasses: ['', [Validators.required]],
      teacherId: [null, [Validators.required]]
    });

    if (!!data && !!data.editingCourse) {
      this.title = "Editar Curso";
      this.courseForm.patchValue({
        name: data.editingCourse.name,
        hours: data.editingCourse.hours,
        nClasses: data.editingCourse.nClasses,
        teacherId: data.editingCourse.teacherId || null // Asegura que solo almacena el ID
      });
    }
  }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() : void {
    this.teachersService.getTeachers().subscribe({
      next: (data) => {
        this.teachers = data;
      }
    })
  }
  onConfirm(): void {
    if(this.courseForm.invalid){
      this.courseForm.markAllAsTouched();
    } else {
      const courseData = { ...this.courseForm.value };
      this.matDialogRef.close(courseData);
    }
  }
}
