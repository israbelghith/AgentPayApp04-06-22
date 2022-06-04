import { Agent } from './agent.model';
import { Facture } from './facture.model';

export class
Paiement{
  idP: number;
  dateP: Date=new Date();
  modePaiement: string;
  etat: string;
  agent: Agent;
  factures: Facture[];

}
