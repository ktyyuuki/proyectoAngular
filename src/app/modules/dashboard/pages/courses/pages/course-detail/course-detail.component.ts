import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../../models';
import { CoursesService } from '../../../../../../core/services/courses.service';
import { Student } from '../../../students/models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { CourseActions } from '../../store/course.actions';
import { selectCoursesError, selectIsLoadingCourses, selectSelectedCourse, selectSelectedCourseTeacher } from '../../store/course.selectors';
import { StudentActions } from '../../../students/store/student.actions';
import { selectStudents, selectStudentsByIds } from '../../../students/store/student.selectors';

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
  teacher$: Observable<string | undefined>;

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
    this.teacher$ = this.store.select(selectSelectedCourseTeacher);
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
        const studentIds = course.inscriptions.map((x) => x.studentId);
        // console.log("📌 Estudiante IDs antes de dispatch:", studentIds);
        this.store.dispatch(StudentActions.loadStudentsByIds({ studentIds }));
        this.students$ = this.store.select(selectStudentsByIds(studentIds));
        this.students$.subscribe((students) => {
          // console.log("📌 Estudiantes obtenidos desde selector:", students);
          this.dataSource = students;
        });
      }
    });
  }
}
