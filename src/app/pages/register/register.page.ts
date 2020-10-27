import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidator } from '../../components/custom-validator/custom-validator';
import {UserService} from '../../services/user-service/user.service';
import {Router} from '@angular/router';
import {ToastService} from '../../services/toast/toast.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerForm: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly toastService: ToastService,
    ) {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                CustomValidator.isValidMailFormat
            ])],
            matchingPassword: this.formBuilder.group({
                password: ['', Validators.compose([
                    Validators.required,
                    CustomValidator.password
                ])],
                confirmPassword: ['', Validators.required]
            }, { validator: CustomValidator.areEqual }),
        });
    }

    ngOnInit() {
    }

    sendForm() {
        this.userService.register(this.registerForm.getRawValue())
            .then((res) => {
                console.log(res);
                this.router.navigate(['login']);
                this.toastService.presentToast('RegisterPage.success');
            })
            .catch(() => {
                const error = {
                    registerError: true
                };

                this.registerForm.controls.matchingPassword.setErrors(error);
            });
    }
}
