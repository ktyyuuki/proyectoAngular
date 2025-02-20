import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../../../../core/services/students.service';
import { Student } from '../../models';
import { Courses } from '../../../courses/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-student-detail',
  standalone: false,

  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit{
  studentId!: string;
  student?: Student;
  studentCourses: Courses[] = [];
  isLoading: boolean = false;
  coursesInscription: Courses[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private httpClient: HttpClient
  ){  }

  ngOnInit(): void {
    this.studentId = this.activatedRoute.snapshot.params['id'];
    // console.log('Student id: ', this.studentId);

    this.studentsService.getStudentById(this.studentId).subscribe({
      next:(studentData) => {
        if(studentData){
          this.student = studentData;
          console.log(this.student.inscriptions);

          if(studentData.inscriptions){
            // Obtener los courseId de las inscripciones
            const courseId = studentData.inscriptions.map((x) => x.courseId).map(id => `id=${id}`).join('&');

            // Obtener los cursos inscritos
            this.httpClient.get<Courses[]>(`${environment.baseApiUrl}/courses?${courseId}&_embed=teacher`).subscribe({
              next: (courses) => {
                this.coursesInscription = courses.filter(c => courseId.includes(c.id));
                console.log('Cursos inscritos:', this.coursesInscription);
              },
              complete: () => this.isLoading = false
            });
          }
        } else {
          console.error("Cursos no encontrados");
        }
      },
      error: () => {},
      complete: () => {}
    });
  }
}
