import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from '../model/facture.model';
import { Paiement } from '../model/paiement.model';
import { Storage } from '@ionic/storage';
const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class PaiementService {
  apiURL?: string = 'http://192.168.1.123:8080/caisses/paiementAvecFacture';
  list: any;

  constructor(private storage: Storage, private http: HttpClient) {
    this.init();
  }

  payerFactures(paiements: any[]): Observable<Paiement> {
    return this.http.post<Paiement>(
      this.apiURL + '/ajouterPaiement',
      paiements,
      httpOptions
    );
  }
  modifierFactures(factures: Facture[]): Observable<Facture[]> {
    return this.http.put<Facture[]>(
      this.apiURL + '/payer',
      factures,
      httpOptions
    );
  }

  //fct create paiement
  async init() {
    await this.storage.create();
  }

  //agregar
  async addPaiement(value: any) {
    // eslint-disable-next-line prefer-const
    let id = (await this.storage.length()) + 1;
    await this.storage.set(id.toString(), value);
  }


  lister() {
    // eslint-disable-next-line prefer-const
    let listPaiement = [];
    this.storage.forEach((v, k) => {
      if (k !== 'ListeDesFactures' && k !== 'agent') {
        listPaiement.push(v);
      }
    });
    return listPaiement;
  }

  async deleteAll() {
    this.storage.forEach((v, k) => {
      this.storage.remove(k);
    });
  }
async deleteAgent()
{
  this.storage.forEach((v, k) => {
    if (k === 'agent') {
      this.storage.remove(k);
    }
  });
}
 async deleteFacture() {
    this.storage.forEach((v, k) => {
      if (k === 'ListeDesFactures') {
        this.storage.remove(k);
      }
    });
  }
  async deletePaiement() {
    this.storage.forEach((v, k) => {
      if (k !== 'ListeDesFactures' && k !== 'agent') {
        this.storage.remove(k);
      }
    });
  }
}
