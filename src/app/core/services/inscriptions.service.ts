import { Injectable } from '@angular/core';
import { Inscription } from '../../modules/dashboard/pages/inscriptions/models';
import { delay, Observable, of } from 'rxjs';

let INSCRIPTIONS_DB : Inscription[] = [
  // {
  //   id: 'cls1',
  //   name: 'Clase-01'
  // },
  // {
  //   id: 'cls2',
  //   name: 'Clase-02'
  // }
]

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  constructor() { }

  getInscriptions(): Observable<Inscription[]> {
    return of([...INSCRIPTIONS_DB]).pipe(delay(1000));
  }
}
