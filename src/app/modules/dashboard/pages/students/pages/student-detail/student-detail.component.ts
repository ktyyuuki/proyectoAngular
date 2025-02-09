import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../../../../core/services/students.service';
import { Student } from '../../models';

@Component({
  selector: 'app-student-detail',
  standalone: false,

  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit{
  studentId!: number;
  student?: Student;
  // fullName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService
  ){  }

  ngOnInit(): void {
    this.studentId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // console.log('Student id: ', this.studentId);

    this.studentsService.getStudentById(this.studentId).subscribe({
      next:(studentData) => {
        if(studentData){
          this.student = studentData;
          // console.log("Estudiante cargado:", this.student);
        } else {
          console.error("Estudiante no encontrado");
        }
      },
      error: () => {},
      complete: () => {}
    });
  }
}
