import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../../core/services/courses.service';
import { Courses } from './models';

@Component({
  selector: 'app-courses',
  standalone: false,

  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  isLoading = false;
  dataSource: Courses[] = [];

  constructor(private coursesService: CoursesService){}

  handleCoursesUpdate(data: Courses[]): void {
    this.dataSource = [...data];
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.coursesService.getCourses().subscribe({
      next: (data) => {
        this.handleCoursesUpdate(data);
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  onDelete(id: string): void {
    if (confirm("Estas seguro?")){
      this.isLoading = true;
      this.coursesService.deleteCourseById(id).subscribe({
        next: (data) => {
          this.handleCoursesUpdate(data);
        },
        error: () =>{
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }
}
