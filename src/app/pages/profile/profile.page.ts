import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user-service/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {from, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ToastService} from "../../services/toast/toast.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    @ViewChild('imageInput') imageInput;

    profileForm: any;
    imageUrl: any;
    saving: boolean;
    private file: any;
    private path: string;
    private image: string;

    constructor(
        private readonly userService: UserService,
        private readonly formBuilder: FormBuilder,
        private readonly storage: AngularFireStorage,
        private readonly toastService: ToastService,
        private readonly translate: TranslateService,
    ) {
        this.profileForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: [{value: null, disabled: true}, null],
            avatar_url: [''],
        });

        this.profileForm.get('name').setValue(this.userService.authState.displayName);
        this.profileForm.get('email').setValue(this.userService.authState.email);
        this.profileForm.get('avatar_url').setValue(this.userService.authState.photoURL);
    }

    ngOnInit() {
    }

    logout() {
        this.userService.logout();
    }

    sendForm() {
        this.saving = true;
        if(this.path && this.file) {
            const task = this.storage.upload(this.path, this.file);
            this.getDownloadUrl(task, this.path).subscribe((url) => {
                this.image = url;
                this.userService.updateUser({
                    displayName: this.profileForm.get('name').value,
                    photoURL: this.image
                }).then(() => {
                    this.saving = false;
                    this.toastService.presentToast(this.translate.instant('Profile.success'));
                });
            });
        } else {
            this.userService.updateUser({
                displayName: this.profileForm.get('name').value,
            }).then(() => {
                this.saving = false;
                this.toastService.presentToast(this.translate.instant('Profile.success'));
            });
        }
    }

    triggerUpload() {
        this.imageInput.nativeElement.click();
    }

    onFileChanged(event) {
        this.file = event.target.files[0];
        this.path = `profile/${this.file.name}`;
        if (this.file.type.split('/')[0] !== 'image') {
            return alert('You can upload only images');
        } else {
            const reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]);

            reader.onload = async () => {
                this.imageUrl = reader.result;
            };
        }
    }

    private getDownloadUrl(uploadTask: AngularFireUploadTask, path: string): Observable<string> {
        return from(uploadTask).pipe(
            switchMap(() => this.storage.ref(path).getDownloadURL()),
        );
    }
}
