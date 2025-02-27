import { Injectable } from '@angular/core';
import { Inscription } from '../../modules/dashboard/pages/inscriptions/models';
import { delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  constructor(private httpClient: HttpClient) { }

  getInscriptions(): Observable<Inscription[]> {
    // return of([...INSCRIPTIONS_DB]).pipe(delay(1000));
    return this.httpClient.get<Inscription[]>(`${environment.baseApiUrl}/inscriptions?_embed=student&_embed=course`);
  }
}
