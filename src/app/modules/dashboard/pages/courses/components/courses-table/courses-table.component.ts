import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Courses } from '../../models';

@Component({
  selector: 'app-courses-table',
  standalone: false,

  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss'
})
export class CoursesTableComponent {
  @Input()
  dataSource: Courses[] = [];

  displayedColumns: string[] = ['id', 'course', 'hours', 'classes', 'teacher', 'edit', 'view', 'delete'];

  @Output()
  delete = new EventEmitter<string>();

  @Output()
  edit = new EventEmitter<Courses>();
}
