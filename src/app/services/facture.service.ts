import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from '../model/facture.model';
const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class FactureService {
  apiURL?: string = 'http://192.168.1.123:8080/caisses/facture';
  constructor(private http: HttpClient) {}

  chercherParSecteur(secteur: string): Observable<Facture[]> {
    return this.http.get<Facture[]>(
      this.apiURL + '/secteur/' + secteur,
      httpOptions
    );
  }
}
