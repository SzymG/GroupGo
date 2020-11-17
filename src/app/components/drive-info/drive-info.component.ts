import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Drive} from '../../services/drive/drive';
import {UserService} from '../../services/user-service/user.service';
import {ToastService} from '../../services/toast/toast.service';
import {TranslateService} from '@ngx-translate/core';
import {DriveService} from '../../services/drive/drive.service';
import {DriveInfoService} from '../../services/drive-info/drive-info.service';
import {DriveInfo} from '../../services/drive-info/drive-info';

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

    public driveUsers = [];
    public isCurrentUserDriveEnrolled = false;
    public isDriveFull = false;
    public driveUsersLoading: boolean;
    public saving: boolean;
    public approved;

    private userDriveInfoId: string;

    constructor(
        private readonly modalController: ModalController,
        private readonly alertController: AlertController,
        private readonly userService: UserService,
        private readonly toastService: ToastService,
        private readonly translate: TranslateService,
        private readonly driveService: DriveService,
        private readonly driveInfoService: DriveInfoService,
    ) {
        this.approved = 'approved';
        this.fetchUserDrives();
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
        if (!this.isAuthor && this.isCurrentUserDriveEnrolled && this.userDriveInfoId) {

            this.saving = true;

            this.driveInfoService.delete(this.userDriveInfoId).then((res) => {
                this.fetchUserDrives();
                this.toastService.presentToast(this.translate.instant('ClubPage.leavedDrive'));
            }).catch((err) => {
                this.toastService.presentToast(this.translate.instant('ClubPage.notLeavedDrive'));
            }).finally(() => {
                this.saving = false;
            });
        }
    }

    enrollDrive() {
        if (!this.isAuthor && !this.isCurrentUserDriveEnrolled) {
            const data: DriveInfo = {
                drive_id: this.itemId,
                user_id: this.userService.currentUserId,
                user_name: this.userService.authState.displayName || this.userService.authState.email,
                user_photo: this.userService.authState.photoURL || null,
            };

            this.saving = true;

            this.driveInfoService.create(data).then((res) => {
                this.fetchUserDrives();
                this.toastService.presentToast(this.translate.instant('ClubPage.enrolledDrive'));
            }).catch((err) => {
                this.toastService.presentToast(this.translate.instant('ClubPage.notEnrolledDrive'));
            }).finally(() => {
                this.saving = false;
            });
        }
    }

    private fetchUserDrives() {
        this.driveUsersLoading = true;
        this.isCurrentUserDriveEnrolled = false;

        this.driveInfoService.getDriveInfos().subscribe((res: any) => {
            this.driveUsers = res.filter((item) => {
                if (item.payload.doc.data().drive_id === this.itemId) {
                    if (item.payload.doc.data().user_id === this.userService.currentUserId) {
                        this.userDriveInfoId = item.payload.doc.id;
                        this.isCurrentUserDriveEnrolled = true;
                    }

                    return item;
                }
            }).map((it) => {
                return it.payload.doc;
            });

            this.isDriveFull = +this.itemData.number_of_places === this.driveUsers.length;

            this.driveUsersLoading = false;
        });
    }
}
