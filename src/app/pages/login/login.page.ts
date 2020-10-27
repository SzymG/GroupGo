import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidator} from '../../components/custom-validator/custom-validator';
import {UserService} from '../../services/user-service/user.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    login: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private translate: TranslateService,
        private router: Router,
    ) {
        this.login = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, CustomValidator.isValidMailFormat])],
            password: ['', Validators.required],
            validationError: false,
        });
    }

    ngOnInit() {
    }

    logForm() {
        this.userService.login(this.login.getRawValue())
            .then((res) => {
                console.log(res);
                this.router.navigate(['profile']);
            })
            .catch(() => {
                const error = {
                    loginError: true
                };

                this.login.controls.password.setErrors(error);
            });
    }
}
