import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {first} from 'rxjs/operators';

export const LANGUAGE_KEY = 'language';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    authState: any = null;

    constructor(
        private readonly storage: Storage,
        private readonly plt: Platform,
        private readonly router: Router,
        public afAuth: AngularFireAuth,
    ) {
        this.afAuth.authState.subscribe((data) => {
            this.authState = data;
        });
    }

    login(formValue) {
        const {email, password} = formValue;
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    register(formValue) {
        const username = formValue.email;
        const password = formValue.matchingPassword.password;

        return this.afAuth.auth.createUserWithEmailAndPassword(username, password);
    }

    logout() {
        this.afAuth.auth.signOut().then((res) => {
            console.log(res);
            this.router.navigate(['home']);
        });
    }

    setLanguage(language: string) {
        return this.storage.set(LANGUAGE_KEY, language);
    }

    async getLanguage() {
        return this.storage.get(LANGUAGE_KEY);
    }

    isFirebaseAuthenticated() {
        return this.afAuth.authState.pipe(first()).toPromise();
    }

    isFirebaseAuthenticatedSubscription() {
        return this.afAuth.authState;
    }

    get currentUserId(): string {
        return this.authState !== null ? this.authState.uid : null;
    }

    updateUser(data) {
        return this.afAuth.auth.currentUser.updateProfile(data);
    }
}
