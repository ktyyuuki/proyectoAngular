import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../../../../core/services/students.service';
import { Profile, Student } from '../../models';
import { Courses } from '../../../courses/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoadingStudents, selectSelectedStudent, selectSelectedStudentFullName, selectSelectedStudentGender, selectSelectedStudentMail, selectSelectedStudentPhone, selectSelectedStudentProfile, selectStudentCourses, selectStudentsError } from '../../store/student.selectors';
import { StudentActions } from '../../store/student.actions';
import { InscriptionActions } from '../../../inscriptions/store/inscription.actions';
import { Inscription } from '../../../inscriptions/models';

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
  courses$: Observable<Courses[]>;

  // DATOS DEL CURSO PARA MOSTRAR EN HTML
  fullName$: Observable<string | null>;
  profile$: Observable<Profile | undefined>;
  email$: Observable<string | undefined>;
  phone$: Observable<string | undefined>;
  gender$: Observable<string | undefined>;

  studentId!: string;
  // student?: Student;
  coursesInscription: Inscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private httpClient: HttpClient,
    private store: Store
  ){
    this.student$ = this.store.select(selectSelectedStudent);
    this.courses$ = this.store.select(selectStudentCourses);
    this.isLoading$ = this.store.select(selectIsLoadingStudents);
    this.error$ = this.store.select(selectStudentsError);
    // DATOS DEL CURSO PARA MOSTRAR EN HTML
    this.fullName$ = this.store.select(selectSelectedStudentFullName);
    this.profile$ = this.store.select(selectSelectedStudentProfile);
    this.email$ = this.store.select(selectSelectedStudentMail);
    this.phone$ = this.store.select(selectSelectedStudentPhone);
    this.gender$ = this.store.select(selectSelectedStudentGender);
  }

  ngOnDestroy(): void {
    this.store.dispatch(StudentActions.resetState());
  }

  ngOnInit(): void {
    this.studentId = this.activatedRoute.snapshot.params['id'];
    // console.log('Student id: ', this.studentId);

    this.store.dispatch(StudentActions.getStudentById({id: this.studentId}));

    this.student$.subscribe((student) => {
      if (student?.inscriptions) {
        this.coursesInscription = student.inscriptions;
        const courseIds = this.coursesInscription.map((x) => x.courseId!);
        this.store.dispatch(StudentActions.loadStudentCourses({ courseIds }));
      }
    });

    // this.studentsService.getStudentById(this.studentId).subscribe({
    //   next:(studentData) => {
    //     if(studentData){
    //       this.student = studentData;
    //       // console.log(this.student.inscriptions);

    //       if(studentData.inscriptions){
    //         // Obtener los courseId de las inscripciones
    //         const courseId = studentData.inscriptions.map((x) => x.courseId).map(id => `id=${id}`).join('&');

    //         // Obtener los cursos inscritos
    //         this.httpClient.get<Courses[]>(`${environment.baseApiUrl}/courses?${courseId}&_embed=teacher`).subscribe({
    //           next: (courses) => {
    //             this.coursesInscription = courses.filter(c => courseId.includes(c.id));
    //             // console.log('Cursos inscritos:', this.coursesInscription);
    //           },
    //           complete: () => {}
    //         });
    //       }
    //     } else {
    //       console.error("Cursos no encontrados");
    //     }
    //   },
    //   error: () => {},
    //   complete: () => {}
    // });
  }

  removeInscription(courseId: Courses['id']) : void {
    const inscriptionToDelete = this.coursesInscription.find((ins) => ins.courseId === courseId);

    if(inscriptionToDelete){
      if(confirm('¿Estás seguro que deseas eliminar la inscripción a este curso?')){
        this.store.dispatch(InscriptionActions.deleteInscriptionById({id: inscriptionToDelete.id}));

        setTimeout(() => {
          this.store.dispatch(StudentActions.getStudentById({ id: this.studentId }));
        }, 500);
      }
    }

  }
}
