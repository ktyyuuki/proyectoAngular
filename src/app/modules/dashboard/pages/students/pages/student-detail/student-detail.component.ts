import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../../../../core/services/students.service';
import { Student } from '../../models';
import { Courses } from '../../../courses/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoadingStudents, selectSelectedStudent, selectStudentsError } from '../../store/student.selectors';
import { StudentActions } from '../../store/student.actions';

@Component({
  selector: 'app-student-detail',
  standalone: false,

  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit, OnDestroy{
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;
  student$: Observable<Student | null>;

  studentId!: string;
  student?: Student;
  studentCourses: Courses[] = [];
  coursesInscription: Courses[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private httpClient: HttpClient,
    private store: Store
  ){
    this.student$ = this.store.select(selectSelectedStudent);
    this.isLoading$ = this.store.select(selectIsLoadingStudents);
    this.error$ = this.store.select(selectStudentsError);
  }

  ngOnDestroy(): void {
    this.store.dispatch(StudentActions.resetState());
  }

  ngOnInit(): void {
    this.studentId = this.activatedRoute.snapshot.params['id'];
    // console.log('Student id: ', this.studentId);

    this.store.dispatch(StudentActions.getStudentById({id: this.studentId}));

    this.studentsService.getStudentById(this.studentId).subscribe({
      next:(studentData) => {
        if(studentData){
          this.student = studentData;
          // console.log(this.student.inscriptions);

          if(studentData.inscriptions){
            // Obtener los courseId de las inscripciones
            const courseId = studentData.inscriptions.map((x) => x.courseId).map(id => `id=${id}`).join('&');

            // Obtener los cursos inscritos
            this.httpClient.get<Courses[]>(`${environment.baseApiUrl}/courses?${courseId}&_embed=teacher`).subscribe({
              next: (courses) => {
                this.coursesInscription = courses.filter(c => courseId.includes(c.id));
                // console.log('Cursos inscritos:', this.coursesInscription);
              },
              complete: () => {}
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
