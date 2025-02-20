import { Injectable } from '@angular/core';
import { Teacher } from '../../modules/dashboard/pages/teachers/models/teacher';
import { Observable, delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private httpClient: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    // return of([...TEACHERS_DB]);
    return this.httpClient.get<Teacher[]>(`${environment.baseApiUrl}/teachers`);
  }
}
