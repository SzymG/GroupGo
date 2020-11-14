import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DriveCreateComponent} from "./drive-create/drive-create.component";

@Component({
    selector: 'app-club',
    templateUrl: './club.page.html',
    styleUrls: ['./club.page.scss'],
})
export class ClubPage implements OnInit {

    constructor(
        private readonly modalController: ModalController,
        ) { }

    ngOnInit() {
    }

    async showCreateModal() {
        const modal = await this.modalController.create({
            component: DriveCreateComponent,
        });

        return await modal.present();
    }
}
