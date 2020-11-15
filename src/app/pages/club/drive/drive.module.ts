import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DrivePage } from './drive.page';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../../components/components.module";

const routes: Routes = [
  {
    path: '',
    component: DrivePage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule,
        ComponentsModule
    ],
  declarations: [DrivePage]
})
export class DrivePageModule {}
