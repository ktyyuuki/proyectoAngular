import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, concatMap, map, switchMap, of } from 'rxjs';
import { Student } from '../../modules/dashboard/pages/students/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class StudentsService {

  constructor(private httpClient: HttpClient) { }

  getStudentsObservable(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(`${environment.baseApiUrl}/students`).pipe(delay(1000));
  }

  addStudent(student: Omit<Student, 'id'>): Observable<Student> {
    return this.httpClient.post<Student>(`${environment.baseApiUrl}/students`, student).pipe(delay(500))
  }

  getStudentById(id: Student['id']): Observable<Student> {
    return this.httpClient.get<Student>(`${environment.baseApiUrl}/students/${id}?_embed=inscriptions`).pipe(delay(550));
  }

  updateStudentById(id: Student['id'], data: Partial<Student>): Observable<Student> {
    return this.httpClient.patch<Student>(`${environment.baseApiUrl}/students/${id}`, data).pipe(delay(500))
  }

  deleteStudentById(id: Student['id']): Observable<Student[]> {
    return (
      this.httpClient.delete<Student>(`${environment.baseApiUrl}/students/${id}`)
      .pipe(concatMap(() => this.getStudentsObservable()))
    );
  }

  getStudentsByIds(studentIds: string[]): Observable<Student[]> {
    const queryParams = studentIds.map((id) => `id=${id}`).join('&');
    return this.httpClient.get<Student[]>(`${environment.baseApiUrl}/students?${queryParams}`);
  }

}
