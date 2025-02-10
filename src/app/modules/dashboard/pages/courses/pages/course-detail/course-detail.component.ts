import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../../models';
import { CoursesService } from '../../../../../../core/services/courses.service';

@Component({
  selector: 'app-course-detail',
  standalone: false,

  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit{
  dataSource : any[] = [];

  course?: Courses;
  courseId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService
  ){}

  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.params['id'];
    console.log('Id del curso: ', this.courseId);

    this.coursesService.getCourseById(this.courseId).subscribe({
      next: (courseData) => {
        if(courseData) {
          this.course = courseData;
          console.log(this.course);
        } else {
          console.error("Curso no encontrado");
        }
      },
      error: (err) => console.error("Curso no encontrado ", err),
      complete: () => {}
    })
  }
}
