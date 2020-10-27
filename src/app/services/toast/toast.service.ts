import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(
        private toastController: ToastController,
        private translate: TranslateService
    ) {}

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: this.translate.instant(message),
            duration: 2000
        });
        toast.present();
    }
}
