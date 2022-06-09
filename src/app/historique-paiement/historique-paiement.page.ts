/* eslint-disable @typescript-eslint/prefer-for-of */

import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { PaiementService } from '../services/paiement.service';
import { Paiement } from '../model/paiement.model';

import { VerifAuthentificationPage } from '../verif-authentification/verif-authentification.page';
import { AuthentificationService } from '../services/authentification.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-historique-paiement',
  templateUrl: './historique-paiement.page.html',
  styleUrls: ['./historique-paiement.page.scss'],
})
export class HistoriquePaiementPage implements OnInit {
  listePaiement = [];
  listeData = [];
  list = [];
  p = new Paiement();
  constructor(
    private paiementService: PaiementService,
    private modalController: ModalController,
    private alertController: AlertController,
    public authService: AuthentificationService,
    public actionSheetController: ActionSheetController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listePaiement = this.paiementService.lister();
  }

  transfererPaiement() {
    for (let i = 0; i < this.listePaiement.length; i++) {
      this.list.push(this.listePaiement[i].paiement);
      this.paiementService
        .payerFactures(this.listePaiement[i].paiement)
        .subscribe((paiementeffec) => {
          const facturesList = this.listePaiement[i].paiement.factures;

          for (let j = 0; j < facturesList.length; j++) {
            facturesList[j].paiement = paiementeffec;
          }
          this.paiementService
            .modifierFactures(facturesList)
            .subscribe((paiement) => {
              console.log('le paiement des factures effectué', paiement);
            });
        });
        window.location.reload();
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: VerifAuthentificationPage,
      componentProps: {},
    });

    modal.onDidDismiss().then(async (dataReturned) => {
      if (dataReturned.data === 'ok') {
        console.log(dataReturned.data);

        this.transfererPaiement();
        this.paiementService.deletePaiement();
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: '',
          subHeader: '',
          message: 'Le transfer des Paiements est effectué convenablement ',
          buttons: ['OK'],
        });
        await alert.present();
      }
    });

    return await modal.present();
  }

  paiement() {
    this.router.navigateByUrl('/facture');
  }
  historique() {
    this.router.navigateByUrl('/historique-paiement');
  }

  acceuil() {
    this.router.navigateByUrl('/PageAccueil');
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
