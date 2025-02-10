import { Component, Input } from '@angular/core';
import { Student } from '../../../../../students/models';

@Component({
  selector: 'app-course-students',
  standalone: false,

  templateUrl: './course-students.component.html',
  styleUrl: './course-students.component.scss'
})
export class CourseStudentsComponent {
  displayedColumns: string[] = ['studentIns', 'dateInscription', 'user', 'edit', 'delete'];

  @Input()
  dataSource: Student[] = [];
}
