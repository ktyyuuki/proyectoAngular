import { Component, OnDestroy, OnInit } from '@angular/core';
import { Inscription } from './models';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';
import { CoursesService } from '../../../../core/services/courses.service';
import { StudentsService } from '../../../../core/services/students.service';
import { Student } from '../students/models';
import { Courses } from '../courses/models';
import { forkJoin, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { InscriptionActions } from './store/inscription.actions';
import { selectInscriptions } from './store/inscription.selectors';

@Component({
  selector: 'app-inscriptions',
  standalone: false,

  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent implements OnInit, OnDestroy {
  isLoading = false;
  dataSource : Inscription[] = [];

  inscriptions$: Observable<Inscription[]>;

  students : Student[] = [];
  courses: Courses[] = [];

  constructor(
    private store: Store,
    // private inscriptionService: InscriptionsService,
    private coursesService: CoursesService,
    private studentService: StudentsService
  ){
    this.inscriptions$ = this.store.select(selectInscriptions);
  }

  ngOnDestroy(): void {
    this.store.dispatch(InscriptionActions.resetState());
  }


  ngOnInit(): void {
    this.isLoading = true;
    this.store.dispatch(InscriptionActions.loadInscriptions());

    this.inscriptions$.pipe(
      tap((inscription) => {
        this.dataSource = [...inscription];
        console.log(this.dataSource);
        this.isLoading = false;
      })
    ).subscribe();

    // this.inscriptions$.subscribe({
    //   next: (inscriptions) => {
    //     this.dataSource = [...inscriptions];
    //     console.log(this.dataSource);
    //   }
    // });

    // this.inscriptionService.getInscriptions().subscribe({
    //   next: (data) => { this.dataSource = [...data] },
    //   error: () => { this.isLoading = false },
    //   complete: () => { this.isLoading = false }
    // })
  }

  createInscription() : void {
    this.store.dispatch(InscriptionActions.createInscription({
      data: {
        courseId: 'fa4e',
        studentId: '2dbs',
      }
    }));
  }


  loadStudentsAndCourses() : void {
    forkJoin([
      this.coursesService.getCourses(),
      this.studentService.getStudentsObservable()
    ]).subscribe({
      next: ([courses, students]) => {
        this.courses = courses,
        this.students = students
      }
    });
  }

  onSubmit() : void{}


}
