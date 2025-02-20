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

  addCourse(payload: {name: string, hours: number, nClasses: number, teacher: Teacher}): Observable<Courses[]> {
    // 1° Crear curso
    return (
      this.httpClient
        .post<Courses>(`${environment.baseApiUrl}/courses`, payload)
        //2° paso: consulta el listado de actualizado de los cursos
        .pipe(concatMap(() => this.getCourses()))
      );
  }

  updateCourseById(id: string, data: {name: string}): Observable<Courses[]> {
    return (
      this.httpClient.patch<Courses>(`${environment.baseApiUrl}/courses/${id}`, data)
      .pipe(concatMap(() => this.getCourses()))
    )
  }

  deleteCourseById(id: string): Observable<Courses[]> {
    return (
      this.httpClient.delete<Courses>(`${environment.baseApiUrl}/courses/${id}`)
        .pipe(concatMap(() => this.getCourses()))
      )
  }

  getCourseById(id: string): Observable<Courses> {
    return this.httpClient.get<Courses>(`${environment.baseApiUrl}/courses/${id}?_embed=inscriptions&_embed=teacher`);
  }
}
