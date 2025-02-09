import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Courses } from '../../modules/dashboard/pages/courses/models';
import { generateRandomId } from '../../shared/utils';
import { TEACHERS_DB } from './teachers.service';
import { Teacher } from '../../modules/dashboard/pages/teachers/models/teacher';

let COURSES_DB: Courses[] = [
  {
    id: generateRandomId('Javascript'),
    name: 'Javascript',
    hours: 40,
    nClasses: 20,
    teacher: TEACHERS_DB[0]
  },
  {
    id: generateRandomId('Angular'),
    name: 'Angular',
    hours: 46,
    nClasses: 23,
    teacher: TEACHERS_DB[0]
  },
  {
    id: generateRandomId('RxJs'),
    name: 'RxJs',
    hours: 20,
    nClasses: 10,
    teacher: TEACHERS_DB[1]
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

  addCourse(payload: {name: string, hours: number, nClasses: number, teacher: Teacher}): Observable<Courses[]> {
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
