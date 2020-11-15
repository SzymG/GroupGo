import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Drive} from '../../services/drive/drive';
import {UserService} from '../../services/user-service/user.service';
import {ToastService} from '../../services/toast/toast.service';
import {TranslateService} from '@ngx-translate/core';
import {DriveService} from '../../services/drive/drive.service';

@Component({
    selector: 'app-drive-info',
    templateUrl: './drive-info.component.html',
    styleUrls: ['./drive-info.component.scss'],
})
export class DriveInfoComponent implements OnInit {
    private itemData: Drive;
    private itemId;

    public isAuthor;
    public item: any;
    public isArchive: boolean;

    public driveUsers = ['1', '2', '3'];
    public isCurrentUserDriveEnrolled = false;
    public driveUsersLoading: boolean;

    constructor(
        private readonly modalController: ModalController,
        private readonly alertController: AlertController,
        private readonly userService: UserService,
        private readonly toastService: ToastService,
        private readonly translate: TranslateService,
        private readonly driveService: DriveService,
    ) {
        this.driveUsersLoading = true;
        // TODO pobierz dane o użytkownikach tego przejazdu
        this.driveUsersLoading = false;
    }

    ngOnInit() {
        this.itemData = this.item.data();
        this.itemId = this.item.id;
        this.isAuthor = this.itemData.authorId === this.userService.currentUserId;
    }

    closeModal(data = null) {
        this.modalController.dismiss(data);
    }

    async deleteDrive() {
        const alert = await this.alertController.create({
            header: this.translate.instant('ClubPage.deleteDrive'),
            message: this.translate.instant('ClubPage.deleteDriveConfirm'),
            buttons: [
                {
                    text: this.translate.instant('Common.cancel'),
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: this.translate.instant('Common.confirm'),
                    handler: () => {
                        this.driveService.delete(this.itemId).then((res) => {
                            this.closeModal({status: 'deleted'});
                            this.toastService.presentToast(this.translate.instant('ClubPage.deleted'));
                        }).catch((err) => {
                            this.toastService.presentToast(this.translate.instant('ClubPage.notDeleted'));
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    leaveDrive() {
        if (!this.isAuthor && this.isCurrentUserDriveEnrolled) {
            // TODO opuszczanie przejazdu przez użytkownika
        }
    }

    enrollDrive() {
        if (!this.isAuthor && !this.isCurrentUserDriveEnrolled) {
            // TODO zapisywanie się na przejazd przez użytkownika
        }
    }
}
