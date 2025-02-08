import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Courses } from '../../modules/dashboard/pages/courses/models';
import { generateRandomId } from '../../shared/utils';

let COURSES_DB: Courses[] = [
  {
    id: generateRandomId('Javascript'),
    name: 'Javascript'
  },
  {
    id: generateRandomId('Angular'),
    name: 'Angular'
  },
  {
    id: generateRandomId('RxJs'),
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

  addCourse(payload: {name: string}): Observable<Courses[]> {
    COURSES_DB.push({
      ...payload,
      id: generateRandomId(payload.name),
    });

    return this.getCourses();
  }

  updateCourseById(id: string, data: {name: string}): Observable<Courses[]> {
    COURSES_DB = COURSES_DB.map((course) =>
      course.id === id ? {...course, ...data} : course
    );
    return this.getCourses();
  }

  deleteCourseById(id: string): Observable<Courses[]> {
    COURSES_DB = COURSES_DB.filter(course => course.id != id);
    return this.getCourses();
  }
}
