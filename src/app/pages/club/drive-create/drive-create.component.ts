import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {Drive} from "../../../services/drive/drive";
import {UserService} from "../../../services/user-service/user.service";
import {DriveService} from "../../../services/drive/drive.service";
import {ToastService} from "../../../services/toast/toast.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-drive-create',
    templateUrl: './drive-create.component.html',
    styleUrls: ['./drive-create.component.scss'],
})
export class DriveCreateComponent implements OnInit {
    createDrive: FormGroup;
    startMapPoint = {
        lat: 52.392682,
        lng: 16.919682,
    };
    endMapPoint = {
        lat: 52.406376,
        lng: 16.925167,
    };

    numberOfPlaces = 1;

    driveCost = 0;

    constructor(
        private formBuilder: FormBuilder,
        private modalController: ModalController,
        private userService: UserService,
        private driveService: DriveService,
        private toastService: ToastService,
        private translate: TranslateService,
    ) {
        this.createDrive = this.formBuilder.group({
            name: ['', Validators.required],
            start_date: ['', Validators.required],
            number_of_places: [this.numberOfPlaces, Validators.required],
            start_point: [this.startMapPoint, Validators.required],
            end_point: [this.endMapPoint, Validators.required],
            distance: ['', Validators.required],
            price_per_person: [this.driveCost, Validators.required],
        });
    }

    ngOnInit() {}


    closeModal() {
        this.modalController.dismiss();
    }

    createForm() {
        let data: Drive;
        data = {
            title: this.createDrive.get('name').value,
            published: new Date(),
            author: this.userService.authState.displayName || this.userService.authState.email,
            authorId: this.userService.currentUserId,
            start_date: this.createDrive.get('start_date').value,
            number_of_places: this.createDrive.get('number_of_places').value,
            start_point: this.createDrive.get('start_point').value,
            end_point: this.createDrive.get('end_point').value,
            distance: this.createDrive.get('distance').value,
            price_per_person: this.createDrive.get('price_per_person').value,
        };

        this.driveService.create(data).then((res) => {
            this.closeModal();
            this.toastService.presentToast(this.translate.instant('ClubPage.created'));
        }).catch((err) => {
            this.toastService.presentToast(this.translate.instant('ClubPage.notCreated'));
        });
    }

    getDate() {
        return new Date();
    }

    onEmitted(e) {
        this.driveCost = e.cost;
        this.createDrive.controls.start_point.setValue(e.start);
        this.createDrive.controls.end_point.setValue(e.end);
        this.createDrive.controls.distance.setValue(e.distance);
        this.createDrive.controls.price_per_person.setValue(
            (parseFloat(e.cost) / (this.createDrive.get('number_of_places').value + 1)).toFixed(2));
    }

    changeNumberOfPlaces(e) {
        if (!!e.target.value) {
            this.createDrive.controls.number_of_places.setValue(parseInt(e.target.value, 10));
        }
    }
}
