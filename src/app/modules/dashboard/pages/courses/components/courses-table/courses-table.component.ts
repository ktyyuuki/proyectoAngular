import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Courses } from '../../models';
import { AuthService } from '../../../../../../core/services/auth.service';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-courses-table',
  standalone: false,

  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss'
})
export class CoursesTableComponent implements OnInit, OnDestroy{
  @Input()
  dataSource: Courses[] = [];

  // displayedColumns: string[] = ['id', 'course', 'hours', 'classes', 'teacher', 'edit', 'view', 'delete'];
  displayedColumns: string[] = [];

  @Output()
  delete = new EventEmitter<string>();

  @Output()
  edit = new EventEmitter<Courses>();

  isAdmin$: Observable<boolean>;

  private destroy$ = new Subject<void>();

  constructor (private authService: AuthService){
    this.isAdmin$ = this.authService.authUser$.pipe(map((x) => x?.profile === 'ADMIN'));
  }

  getDisplayedColumns(isAdmin: boolean): string[] {
    const columns = ['id', 'course', 'hours', 'classes', 'teacher', 'view']; // Columnas Base
    if(isAdmin){
      columns.push('edit', 'delete');
    }
    return columns;
  }


  ngOnInit(): void {
    this.isAdmin$
      .pipe(takeUntil(this.destroy$)) // Se desuscribe cuando el componente se destruye
      .subscribe(isAdmin => {
        this.displayedColumns = this.getDisplayedColumns(isAdmin);
        // console.log('Admin:', isAdmin, 'Columns:', this.displayedColumns);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emitimos un evento para cancelar las suscripciones activas
    this.destroy$.complete(); // Cerramos el Subject
  }
}
