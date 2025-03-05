import { Injectable } from '@angular/core';
import { concatMap, delay, map, Observable } from 'rxjs';
import { Courses } from '../../modules/dashboard/pages/courses/models';
import { Teacher } from '../../modules/dashboard/pages/teachers/models/teacher';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Student } from '../../modules/dashboard/pages/students/models';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) { }

  getCourses(): Observable<Courses[]> {
    return this.httpClient.get<Courses[]>(`${environment.baseApiUrl}/courses?_embed=teacher`).pipe(delay(1000));
  }

  addCourse(payload: Omit<Courses, 'id'>): Observable<Courses> {
    return (
      this.httpClient
        .post<Courses>(`${environment.baseApiUrl}/courses`, payload)
      );
  }

  updateCourseById(id: string, data: Partial<Courses>): Observable<Courses> {
    return this.httpClient.patch<Courses>(`${environment.baseApiUrl}/courses/${id}`, data)
  }

  deleteCourseById(id: Courses['id']): Observable<Courses[]> {
    return (
      this.httpClient.delete<Courses>(`${environment.baseApiUrl}/courses/${id}`)
        .pipe(concatMap(() => this.getCourses()))
      )
  }

  getCourseById(id: Courses['id']): Observable<Courses> {
    return this.httpClient.get<Courses>(`${environment.baseApiUrl}/courses/${id}?_embed=inscriptions&_embed=teacher`);
  }
}
