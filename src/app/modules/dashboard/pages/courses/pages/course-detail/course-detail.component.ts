import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../../models';
import { CoursesService } from '../../../../../../core/services/courses.service';
import { Student } from '../../../students/models';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-detail',
  standalone: false,

  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit{
  dataSource : Student[] = [];
  isLoading = false;

  course?: Courses;
  courseId!: string;

  errorMessage: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.isLoading = true;
    this.courseId = this.activatedRoute.snapshot.params['id'];

    this.coursesService.getCourseById(this.courseId).subscribe({
      next: (courseData) => {
        this.course = courseData;
        this.errorMessage = '';

        if (Array.isArray(courseData.inscriptions)) {
          // Obtener los studentId de las inscripciones
          const studentIds = courseData.inscriptions.map((x) => x.studentId).map(id => `id=${id}`).join('&');

          // Obtener los estudiantes inscritos
          this.httpClient.get<Student[]>(`${environment.baseApiUrl}/students?${studentIds}`).subscribe({
            next: (students) => {
              this.dataSource = students.filter(s => studentIds.includes(s.id));
              console.log('Estudiantes inscritos:', this.dataSource);
            },
            complete: () => this.isLoading = false
          });
        } else {
          this.isLoading = false;
        }

      },
      error: (err) => {
        this.isLoading = false;
        // console.error("Curso no encontrado ", err);
        if (err instanceof HttpErrorResponse){
          if (err.status === 404){
            this.errorMessage = 'Curso no encontrado';
          } else if (err.status === 500){
            this.errorMessage = 'Ha ocurrido un problema en el servidor cargando el curso';
          }
        }
      },
      complete: () => {
        this.isLoading = false;
        this.errorMessage = '';
      }
    })
  }
}
