import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../../core/services/students.service';
import { CoursesService } from '../../../../core/services/courses.service';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  nStudents: number = 0;
  nCourses: number = 0;
  nInscriptions: number = 0;

  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private inscriptionsService: InscriptionsService
  ){}

  ngOnInit(): void {
    this.studentsService.getStudentsObservable().subscribe({
      next: (students) => {
        this.nStudents = students.length;
      }
    })

    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.nCourses = courses.length;
      }
    })

    this.inscriptionsService.getInscriptions().subscribe({
      next: (inscriptions) => {
        this.nInscriptions = inscriptions.length;
      }
    })
  }

}
