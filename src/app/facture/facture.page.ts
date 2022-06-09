/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-const */
import { PaiementService } from './../services/paiement.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

import { ActionSheetController, AlertController } from '@ionic/angular';

import { FactureService } from '../services/facture.service';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { Paiement } from '../model/paiement.model';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.page.html',
  styleUrls: ['./facture.page.scss'],
})
export class FacturePage implements OnInit {
  listData: any;
  reference: number;
  factlist = [];
  listeReference: any[];
  selectedReference;
  paiement = new Paiement();

  constructor(
    private dataService: DataService,
    private paiementService: PaiementService,
    private factureService: FactureService,
    private router: Router,
    private alertController: AlertController,
    public authService: AuthentificationService,
    public actionSheetController: ActionSheetController
  ) {
    this.listeReference = [
      { label: 'Référence Facture', value: 1, isSelected: false },
      { label: 'Référence Client', value: 2, isSelected: false },
      { label: 'Référence Contrat', value: 3, isSelected: false },
    ];
  }

  ngOnInit() {
    this.chercherFacture();
  }
  async chercherFacture() {
    this.listData = await this.dataService.getListeFacture();
    let list = [];
    if (this.listData === null) {
      this.addData();
    } else {
      for (let i of this.listData) {
        if (i.etat === 'impayé') {
          list.push(i);
        }
      }
      this.listData = list;
    }
  }
  async addData() {
    await this.factureService
      .chercherParSecteur(this.dataService.getSecteur())
      .subscribe(async (arg) => {
        console.log(arg);
        for (let i = 0; i < arg.length; i++) {
          await this.dataService.addData(arg[i]);
        }
        this.listData = await this.dataService.getListeFacture();
        window.location.reload();
      });
  }

  reloadPage() {
    window.location.reload();
  }

  async ajouterPaiement() {
    this.factlist = this.listData.filter((x) => x.isselected === true);
    let mt = 0;
    for (let i = 0; i < this.factlist.length; i++) {
      mt = mt + this.factlist[i].montant;
      console.log(i, this.factlist[i].montant);
    }

    this.paiement.modePaiement = 'espèce';
    this.paiement.factures = this.factlist;
    this.paiement.dateP = new Date();
    this.paiement.agent = await this.dataService.getAgent();

    const paiementData = {
      paiement: this.paiement,
      totalMontant: mt,
    };

    await this.paiementService.addPaiement(paiementData);
    this.modifierEtatFacture();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Paiement Effectué',
      subHeader: '',
      message:
        'votre ordre de paiement est effectuée avec succès  <image src="../../assets/icon/success.jpeg"></image></ion-icon> ',
    });
    alert.present();
    this.router.navigate(['/historique-paiement']).then(() => {
      window.location.reload();
    });
  }

  async modifierEtatFacture() {
    for (let i = 0; i < this.listData.length; i++) {
      for (let j = 0; j < this.factlist.length; j++) {
        if (this.listData[i] === this.factlist[j]) {
          this.listData[i].etat = 'payé';
        }
      }
    }
    await this.dataService.updateFactures(this.listData);
  }

  async chercherfacture() {
    const listchercher = [];
    const list = await this.dataService.getListeFacture();
    if (this.selectedReference === '1') {
      for (let i = 0; i < list.length; i++) {
        if (
          list[i].referenceFact === this.reference &&
          list[i].etat !== 'payé'
        ) {
          listchercher.push(list[i]);
        }
      }
    } else if (this.selectedReference === '2') {
      for (let i = 0; i < list.length; i++) {
        if (
          list[i].client.referenceClient === this.reference &&
          list[i].etat !== 'payé'
        ) {
          listchercher.push(list[i]);
        }
      }
    } else if (this.selectedReference === '3') {
      for (let i = 0; i < list.length; i++) {
        if (
          list[i].contrat.referenceContrat === this.reference &&
          list[i].etat !== 'payé'
        ) {
          listchercher.push(list[i]);
        }
      }
    }
    this.listData = listchercher;
  }

  paiements() {
    this.router.navigateByUrl('/facture');
  }
  historique() {
    this.router.navigateByUrl('/historique-paiement');
  }

  acceuil() {
    this.router.navigateByUrl('/PageAccueil'); // folder/:id
  }
  modifierProfile() {
    this.router.navigateByUrl('/modifier-profile');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'A propos',

      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Modifier profil',
          icon: 'person-add-outline',
          data: 5,
          handler: () => {
            this.router.navigateByUrl('/modifier-profile');
          },
        },
        {
          text: 'Deconnexion',
          icon: 'log-out-outline',
          data: 5,
          handler: async () => {
            this.authService.logout();
            await this.paiementService.deleteAgent();
            await this.paiementService.deleteFacture();
            await this.paiementService.deletePaiement();
            this.router.navigateByUrl('/authentification');
          },
        },

        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
}
