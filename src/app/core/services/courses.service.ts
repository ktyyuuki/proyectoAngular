import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Courses } from '../../modules/dashboard/pages/courses/models';

let COURSES_DB: Courses[] = [
  {
    id: 'js1',
    name: 'Javascript'
  },
  {
    id: 'ang',
    name: 'Angular'
  },
  {
    id: 'rx',
    name: 'RxJs'
  }
]

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getCourses(): Observable<Courses[]> {
    return of([...COURSES_DB]).pipe(delay(1000));
  }

  deleteCourseById(id: string): Observable<Courses[]> {
    COURSES_DB = COURSES_DB.filter(course => course.id != id);
    return this.getCourses();
  }
}
