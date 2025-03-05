import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../../models';
import { CoursesService } from '../../../../../../core/services/courses.service';
import { Student } from '../../../students/models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { CourseActions } from '../../store/course.actions';
import { selectCoursesError, selectIsLoadingCourses, selectSelectedCourse, selectSelectedCourseClasses, selectSelectedCourseHours, selectSelectedCourseId, selectSelectedCourseName, selectSelectedCourseTeacher } from '../../store/course.selectors';
import { StudentActions } from '../../../students/store/student.actions';
import { selectStudents, selectStudentsByIds } from '../../../students/store/student.selectors';
import { Inscription } from '../../../inscriptions/models';
import { InscriptionActions } from '../../../inscriptions/store/inscription.actions';

@Component({
  selector: 'app-course-detail',
  standalone: false,

  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit, OnDestroy{
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;
  students$: Observable<Student[]>;
  course$: Observable<Courses | null>;

  // DATOS DEL CURSO PARA MOSTRAR EN HTML
  courseId$: Observable<string | undefined>;
  courseName$: Observable<string | undefined>;
  teacher$: Observable<string | undefined>;
  hours$: Observable<number | undefined>;
  classes$: Observable<number | undefined>;

  dataSource : Student[] = [];
  course?: Courses;
  courseId!: Courses['id'];

  // errorMessage: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private httpClient: HttpClient,
    private store: Store
  ){
    this.course$ = this.store.select(selectSelectedCourse);
    this.isLoading$ = this.store.select(selectIsLoadingCourses);
    this.error$ = this.store.select(selectCoursesError);
    this.students$ = this.store.select(selectStudents);
    // DATOS DEL CURSO PARA MOSTRAR EN HTML
    this.courseId$ = this.store.select(selectSelectedCourseId);
    this.courseName$ = this.store.select(selectSelectedCourseName);
    this.teacher$ = this.store.select(selectSelectedCourseTeacher);
    this.hours$ = this.store.select(selectSelectedCourseHours);
    this.classes$ = this.store.select(selectSelectedCourseClasses);

  }

  ngOnDestroy(): void {
    this.store.dispatch(CourseActions.resetState());
    this.store.dispatch(StudentActions.resetState());
  }

  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.params['id'];

    this.store.dispatch(CourseActions.getCourseById({id: this.courseId}));
    this.store.dispatch(StudentActions.loadStudents());

    this.course$.subscribe((course) => {
      if (course && Array.isArray(course.inscriptions)) {
        // console.log("📌 Inscripciones:", course.inscriptions);
        const studentIds = course.inscriptions.map((x) => x.studentId ?? '');
        // console.log("📌 Estudiante IDs antes de dispatch:", studentIds);

        this.store.dispatch(StudentActions.loadStudentsByIds({ studentIds }));
        this.students$ = this.store.select(selectStudentsByIds(studentIds));
        this.students$.subscribe((students) => {
          this.dataSource = students.map((student) => {
            const inscription = course.inscriptions?.find(
              (ins) => ins.studentId === student.id
            );
            return { ...student, inscriptionId: inscription?.id };
          });
          // console.log('📌 Estudiantes con inscripción:', this.dataSource);
        });
      }
    });
  }

  deleteInscription(inscriptionId: Inscription['id'] ): void {
    if(confirm(`¿Estas seguro que deseas eliminar la inscripción?`)){
      this.store.dispatch(InscriptionActions.deleteInscriptionById({id: inscriptionId}));

      setTimeout(() => {
        this.store.dispatch(CourseActions.getCourseById({ id: this.courseId }));
      }, 500);
    }
  }
}
