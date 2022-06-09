import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agent } from '../model/agent.model';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  apiURL= 'http://192.168.1.123:8080/caisses/agent';

  constructor(private http: HttpClient) { }

  modifierAgent(agent: Agent): Observable<Agent> {
    return this.http.put<Agent>(this.apiURL + '/modifierAgent', agent
    );
  }
}
