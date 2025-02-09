import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, delay } from 'rxjs';
import { Student } from '../../modules/dashboard/pages/students/models';
import { generateId } from '../../shared/utils/index';

let STUDENTS_DB : Student[] = [
  {
    "id": 1,
    "name": "John",
    "lastName": "Doe",
    "email": "john.doe@mail.com",
    "phone": "+56999999999",
    "profile": "Desarrollador",
    "gender": "M"
  },
  {
    "id": 2,
    "name": "Hannah",
    "lastName": "Smith",
    "email": "hsmith@mail.com",
    "phone": "+56998765432",
    "profile": "UI/UX",
    "gender": "F"
  }
]

@Injectable({
  providedIn: 'root'
})

export class StudentsService {

  getStudentsObservable(): Observable<Student[]>{
    return new Observable<Student[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next([...STUDENTS_DB]);
        // subscriber.error('Error al cargar los estudiantes');
        subscriber.complete()
      }, 2000);
    })
  }

  addStudent(student: Student): Observable<Student> {
    student.id = generateId(STUDENTS_DB);
    STUDENTS_DB.push(student);
    // console.log("Estudiantes después de agregar:", STUDENTS_DB);
    return of(student);
  }

  getStudentById(id: number): Observable<Student | undefined> {
    const student = STUDENTS_DB.find(s => s.id === id);
    // console.log("Buscando estudiante con ID:", id, "Resultado:", student);
    return of(student);
  }
}
