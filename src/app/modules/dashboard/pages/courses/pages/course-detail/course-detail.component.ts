import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../../models';
import { CoursesService } from '../../../../../../core/services/courses.service';
import { Student } from '../../../students/models';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseActions } from '../../store/course.actions';
import { selectCoursesError, selectIsLoadingCourses, selectSelectedCourse } from '../../store/course.selectors';

@Component({
  selector: 'app-course-detail',
  standalone: false,

  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit, OnDestroy{
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;
  // students$: Observable<Student[]>;
  course$: Observable<Courses | null>;

  dataSource : Student[] = [];
  course?: Courses;
  courseId!: Courses['id'];

  errorMessage: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private httpClient: HttpClient,
    private store: Store
  ){
    this.course$ = this.store.select(selectSelectedCourse);
    this.isLoading$ = this.store.select(selectIsLoadingCourses);
    this.error$ = this.store.select(selectCoursesError);
  }

  ngOnDestroy(): void {
    this.store.dispatch(CourseActions.resetState());
  }

  ngOnInit(): void {
    // this.isLoading = true;
    this.courseId = this.activatedRoute.snapshot.params['id'];

    this.store.dispatch(CourseActions.getCourseById({id: this.courseId}));

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
            complete: () => {}
          });
        } else {

        }

      },
      error: (err) => {
        // this.isLoading = false;
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
        // this.isLoading = false;
        this.errorMessage = '';
      }
    })
  }
}
