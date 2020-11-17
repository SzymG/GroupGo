import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputMessageComponent } from './input-message/input-message.component';
import { TranslateModule } from '@ngx-translate/core';
import {GoogleMapComponent} from './google-map/google-map.component';
import {DriveItemComponent} from './drive-item/drive-item.component';
import {DriveInfoComponent} from './drive-info/drive-info.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        InputMessageComponent,
        GoogleMapComponent,
        DriveItemComponent,
        DriveInfoComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule,
        FormsModule,
    ],
    exports: [
        InputMessageComponent,
        GoogleMapComponent,
        DriveItemComponent,
        DriveInfoComponent,
    ],
    entryComponents: [
        DriveInfoComponent,
    ]
})
export class ComponentsModule { }
