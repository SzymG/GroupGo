import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DriveInfoComponent} from '../drive-info/drive-info.component';
import {Drive} from '../../services/drive/drive';
import {UserService} from '../../services/user-service/user.service';

@Component({
    selector: 'app-drive-item',
    templateUrl: './drive-item.component.html',
    styleUrls: ['./drive-item.component.scss'],
})
export class DriveItemComponent implements OnInit {
    @Input() item: any;
    @Input() isArchive: boolean;
    @Output() dataChanged = new EventEmitter();
    private itemData: Drive;
    private itemId;

    constructor(
        private readonly modalController: ModalController,
        private readonly userService: UserService,
    ) { }

    ngOnInit() {
        this.itemData = this.item.data();
        this.itemId = this.item.id;
    }

    async openDriveModal() {
        const modal = await this.modalController.create({
            component: DriveInfoComponent,
            componentProps: {
                item: this.item,
                isArchive: this.isArchive,
            }
        });

        modal.onDidDismiss().then((data: any) => {
            if (data.data && data.data.status) {
                this.dataChanged.emit(true);
            }
        });

        return await modal.present();
    }
}
