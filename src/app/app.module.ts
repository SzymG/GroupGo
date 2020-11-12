import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';

const firebase = {
    apiKey: 'AIzaSyALTeMy18xzuj9kM1uQpvbMHqT-1GC-WNc',
    authDomain: 'groupgo-128e5.firebaseapp.com',
    databaseURL: 'https://groupgo-128e5.firebaseio.com',
    projectId: 'groupgo-128e5',
    storageBucket: 'groupgo-128e5.appspot.com',
    messagingSenderId: '943068468407',
    appId: '1:943068468407:web:cdf148a39f082bc9372932',
    measurementId: 'G-06N9H9V7CK'
};

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(firebase),
        AngularFirestoreModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        NavigationBar,
        TranslateModule,
        HttpClient,
        AngularFireAuth,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
