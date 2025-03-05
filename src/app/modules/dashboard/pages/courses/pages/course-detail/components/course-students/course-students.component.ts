import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../../../../students/models';
import { Inscription } from '../../../../../inscriptions/models';

@Component({
  selector: 'app-course-students',
  standalone: false,

  templateUrl: './course-students.component.html',
  styleUrl: './course-students.component.scss'
})
export class CourseStudentsComponent {
  displayedColumns: string[] = ['studentIns', 'delete'];

  @Input()
  dataSource: Student[] = [];

  @Output()
  delete = new EventEmitter<Inscription['id']>();
}
