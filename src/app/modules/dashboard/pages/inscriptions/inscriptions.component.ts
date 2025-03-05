import { Component, OnDestroy, OnInit } from '@angular/core';
import { Inscription } from './models';
import { CoursesService } from '../../../../core/services/courses.service';
import { StudentsService } from '../../../../core/services/students.service';
import { Student } from '../students/models';
import { Courses } from '../courses/models';
import { forkJoin, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { InscriptionActions } from './store/inscription.actions';
import { selectInscriptionError, selectInscriptions, selectIsLoadingInscriptions } from './store/inscription.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionEditFormComponent } from './components/inscription-edit-form/inscription-edit-form.component';

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
    private coursesService: CoursesService,
    private studentService: StudentsService,
    private matDialog: MatDialog,
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
    this.store.dispatch(InscriptionActions.loadInscriptions());

    this.inscriptions$.pipe(
      tap((inscription) => {
        this.dataSource = [...inscription];
      })
    ).subscribe();

    this.loadStudentsAndCourses();
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
      this.store.dispatch(InscriptionActions.createInscription({ data: this.inscriptionForm.value }));
      this.inscriptionForm.reset();
    }
  }

  openEditDialogForm(editInscription: Inscription): void{
    this.matDialog
    .open(InscriptionEditFormComponent, {
      data: {
        editInscription,
        students: this.students,
        courses: this.courses,
      }
    })
    .afterClosed().subscribe({
      next: (data) => {
        if(!!data){
          this.editInscription(editInscription.id, data);
        }
      }
    })
  }

  editInscription(id: Inscription['id'], data: Partial<Inscription>): void {
    this.store.dispatch(InscriptionActions.updateInscriptionById({id, data}));
  }

  deleteInscriptionById(id: Inscription['id']): void{
    if (confirm("¿Estas seguro que deseas eliminar esta inscripción?")){
      this.store.dispatch(InscriptionActions.deleteInscriptionById({id}));
    }
  }
}
