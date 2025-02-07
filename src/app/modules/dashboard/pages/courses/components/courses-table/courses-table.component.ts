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

  displayedColumns: string[] = ['id', 'course', 'actions'];


  @Output()
  delete = new EventEmitter<string>()
}
