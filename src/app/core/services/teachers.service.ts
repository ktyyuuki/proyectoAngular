import { Injectable } from '@angular/core';
import { Teacher } from '../../modules/dashboard/pages/teachers/models/teacher';
import { Observable, delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

// export let TEACHERS_DB : Teacher[] = [
//   {
//     id: 1,
//     name: 'Gastón Guzmán'
//   },
//   {
//     id: 2,
//     name: 'Nicole Soto'
//   },
//   {
//     id: 3,
//     name: 'Bautista Rojas'
//   }
// ]

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
