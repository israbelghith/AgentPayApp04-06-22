/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Agent } from '../model/agent.model';
import { Utilisateur } from '../model/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  apiURL= 'http://localhost:8080/caisses';
  token: string;
  agent: any;
  isloggedIn = false;
  public loggedUser: string;
  public role: string[];
  public secteur: string;
  //err:number = 0;
  private helper = new JwtHelperService();


  constructor(private router: Router,
    private http: HttpClient) { }

  connection(user: any) {
  return this.http.post<Agent>(this.apiURL + '/login', user, { observe: 'response' });
  }
  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.loadToken();
  }
  loadToken() {
    this.token = localStorage.getItem('jwt');
    this.decodeJWT();
  }
  getToken(): string {
    return this.token;
  }
  saveSecteur(sect: string)
  {
    this.secteur=sect;
    console.log(this.secteur);
  }
  getSecteur()
  {console.log(this.secteur);
    return this.secteur;
  }

  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.token);
  }

  logout() {
    this.loadToken();
    this.loggedUser = undefined;
    this.role = undefined;
    this.secteur=undefined;
    this.token = undefined;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
   // this.router.navigate(['/authentification']);
    this.router.navigate(['/authentification']).then(()=>{
      window.location.reload();});
  }

  logoutVerif() {
    this.loggedUser = undefined;
    this.role = undefined;
    this.secteur=undefined;
    this.token = undefined;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
   // this.router.navigate(['/authentification']);
    /*this.router.navigate(['/authentification']).then(()=>{
      window.location.reload();});*/
  }
  decodeJWT() {
    if (this.token === undefined)
      {return false;}
    const decodedToken = this.helper.decodeToken(this.token);
    this.role = decodedToken.role;
    this.secteur=decodedToken.secteur;
    console.log(this.secteur);
    //console.log("roles "+this.roles)
   return  this.loggedUser = decodedToken.sub;
  }

  isAgent(): boolean {
    if (!this.role)
      {return false;}
    return this.role.indexOf('agent') >= 0;

  }

}
