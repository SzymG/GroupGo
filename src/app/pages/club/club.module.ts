import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ClubPage} from './club.page';
import {TranslateModule} from '@ngx-translate/core';
import {DriveCreateComponent} from './drive-create/drive-create.component';
import {ComponentsModule} from '../../components/components.module';

const routes: Routes = [
    {
        path: '',
        component: ClubPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule,
        ReactiveFormsModule,
        ComponentsModule
    ],
    declarations: [ClubPage, DriveCreateComponent],
    entryComponents: [
        DriveCreateComponent,
    ],
})
export class ClubPageModule {
}
