import { Paiement } from './paiement.model';

export class
Facture
{
  idF: number;
  referenceFact: number;
  montant: number;
  periodeCons: Date; // Période de Consommation
  etat: string;
  dateF: Date; // date finale pour payer la facture

  paiement: Paiement;
  //client:Client;
 // contrat:Contrat;
  isselected: boolean;
  index: number;
}
