import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../../core/services/courses.service';
import { Courses } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { TeachersService } from '../../../../core/services/teachers.service';
import { Teacher } from '../teachers/models/teacher';

@Component({
  selector: 'app-courses',
  standalone: false,

  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  isLoading = false;
  dataSource: Courses[] = [];

  constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog
  ){}

  handleCoursesUpdate(data: Courses[]): void {
    this.dataSource = [...data];
  }

  openFormDialog(editingCourse?: Courses): void{
    // if(editingCourse){
    //   console.log('Se va a editar: ', editingCourse)
    // }
    this.matDialog
      .open(CourseFormDialogComponent, {data: {editingCourse} })
      .afterClosed().subscribe({
        next: (data) => {
          // console.log(data);
          if (!!data) {
            if(!!editingCourse){
              this.updateCourse(editingCourse.id, data);
            } else {
              this.addNewCourse(data);
            }
          }
        }
      });
  }

  addNewCourse(data: {name: string, hours: number, nClasses: number, teacher: Teacher}): void {
    this.isLoading = true;
    this.coursesService.addCourse(data).subscribe({
      next: (data) => this.handleCoursesUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false)
    });
  }

  updateCourse(id: string, data: {name:string}){
    this.isLoading = true;
    this.coursesService.updateCourseById(id, data).subscribe({
      next: (data) => this.handleCoursesUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false)
    })
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.coursesService.getCourses().subscribe({
      next: (data) => {
        // console.log(data);
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
    if (confirm("¿Estas seguro que deseas eliminar este curso?")){
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
