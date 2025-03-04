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
import { selectInscriptionError, selectInscriptions, selectIsLoadingInscriptions } from './store/inscription.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscriptions',
  standalone: false,

  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent implements OnInit, OnDestroy {
  inscriptions$: Observable<Inscription[]>;
  isLoading$: Observable<boolean>;

  dataSource : Inscription[] = [];
  error$: Observable<unknown>;

  students : Student[] = [];
  courses: Courses[] = [];

  inscriptionForm: FormGroup;

  constructor(
    private store: Store,
    // private inscriptionService: InscriptionsService,
    private coursesService: CoursesService,
    private studentService: StudentsService,
    private fb: FormBuilder,
  ){
    this.inscriptions$ = this.store.select(selectInscriptions);
    this.isLoading$ = this.store.select(selectIsLoadingInscriptions);
    this.error$ = this.store.select(selectInscriptionError);

    this.inscriptionForm = this.fb.group({
      studentId:[null, [Validators.required]],
      courseId: [null, [Validators.required]]
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(InscriptionActions.resetState());
  }


  ngOnInit(): void {
    // this.isLoading = true;
    this.store.dispatch(InscriptionActions.loadInscriptions());

    this.inscriptions$.pipe(
      tap((inscription) => {
        this.dataSource = [...inscription];
        console.log(this.dataSource);
        // this.isLoading = false;
      })
    ).subscribe();

    this.loadStudentsAndCourses();

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

  onSubmit() : void{
    if(this.inscriptionForm.invalid){
      this.inscriptionForm.markAllAsTouched();
    } else {
      this.store.dispatch(InscriptionActions.createInscription({ data: this.inscriptionForm.value }))
    }
  }


}
