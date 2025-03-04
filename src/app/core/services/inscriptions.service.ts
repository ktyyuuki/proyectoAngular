import { Injectable } from '@angular/core';
import { Inscription } from '../../modules/dashboard/pages/inscriptions/models';
import { concatMap, delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  constructor(private httpClient: HttpClient) { }

  getInscriptions(): Observable<Inscription[]> {
    // return of([...INSCRIPTIONS_DB]).pipe(delay(1000));
    return this.httpClient.get<Inscription[]>(`${environment.baseApiUrl}/inscriptions?_embed=student&_embed=course`).pipe(delay(1000));
  }

  createInscription(data: Omit<Inscription, 'id'>): Observable<Inscription> {
    return this.httpClient.post<Inscription>(`${environment.baseApiUrl}/inscriptions`, data);
  }

  updateInscriptionById(id: Inscription['id'], data: Partial<Inscription>): Observable<Inscription> {
    return (
      this.httpClient.patch<Inscription>(`${environment.baseApiUrl}/inscriptions/${id}`, data)
    )
  }

  deleteInscriptionById(id: Inscription['id']): Observable<Inscription[]>{
    return (
      this.httpClient.delete<Inscription>(`${environment.baseApiUrl}/inscriptions/${id}`)
        .pipe(concatMap(() => this.getInscriptions()))
    )
  }
}
