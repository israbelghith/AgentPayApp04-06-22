import { Role } from './Role';


export class  Utilisateur {
    idU: number;
    matricule: string;
    nom: string;
    prenom: string;
    adresse: string;
    etat: string;
    email: string;
    motDePasse: string;
  //  postes:Poste[];
    role?: Role;


}
