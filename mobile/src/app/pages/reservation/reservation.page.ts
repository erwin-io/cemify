import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  modal: HTMLIonModalElement;
  constructor(
    private modalCtrl: ModalController,) { }


  ngOnInit() {
  }

}
