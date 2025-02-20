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

  addStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(`${environment.baseApiUrl}/students`, student)
  }

  getStudentById(id: Student['id']): Observable<Student> {
    return this.httpClient.get<Student>(`${environment.baseApiUrl}/students/${id}?_embed=inscriptions`);
  }

}
