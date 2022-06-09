/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Agent } from '../model/agent.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  list: any;
  agent = new Agent();
  id: number;
  agt: any;
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    console.log('init');
    await this.storage.create();
    console.log('done');
  }

  //ajouter la liste des factures dans la base
  async addData(item) {
    const storedData = (await this.storage.get('ListeDesFactures')) || [];
    storedData.push(item);
    return this.storage.set('ListeDesFactures', storedData);
  }
  async addPaiement(value: any) {
    // eslint-disable-next-line prefer-const
    let id = (await this.storage.length()) + 1;
    await this.storage.set(id.toString(), value);
  }

  async addAgent(value: Agent) {
    this.agent = value;
    this.id = value.idU;
    await this.storage.set('agent', value);
  }
  getSecteur() {
    return this.agent.secteur;
  }
  /*getPaiement() {
    return this.storage.get('ListeDesFactures') || [];
  }*/

  getListeFacture() {
    return this.storage.get('ListeDesFactures') || [];
  }

  getAgent() {
    const agt = this.storage.get('agent');
    return agt;
  }
  getAgentId() {
    return this.id;
  }

  updateAgent(value: Agent) {
    this.storage.set('agent', value);
  }

  async updateFactures(listData: any) {
    // Store the value under "my-key"
    this.storage.set('ListeDesFactures', listData);
  }
}
