/* eslint-disable @typescript-eslint/naming-convention */
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agent } from '../model/agent.model';
import { Utilisateur } from '../model/utilisateur.model';
import { AuthentificationService } from './authentification.service';
const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  apiURL='http://192.168.1.123:8080/caisses/agent';

  constructor(private http: HttpClient, private authService: AuthentificationService) { }

  chercherParEmail(email: string): Observable<Agent> {
    const url = `${this.apiURL}/chercherParEmail/${email}`;
    return this.http.get<Agent>(url);


  }
}
