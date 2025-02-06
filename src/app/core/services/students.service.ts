import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Student } from '../../modules/dashboard/pages/students/models';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  getStudentsObservable(): Observable<Student[]>{
    return new Observable<Student[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next(
          [
            {
              "id": 1,
              "name": "John",
              "lastName": "Doe",
              "email": "john.doe@mail.com",
              "phone": "+56999999999"
            },
            {
              "id": 2,
              "name": "Hannah",
              "lastName": "Smith",
              "email": "hsmith@mail.com",
              "phone": "+56998765432"
            }
          ]
        );
        // subscriber.error('Error al cargar los estudiantes');
        subscriber.complete() // notifica que no emitirá mas datos
      }, 3000);
    })
  }
}
