import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputMessageComponent } from './input-message/input-message.component';
import { TranslateModule } from '@ngx-translate/core';
import {GoogleMapComponent} from './google-map/google-map.component';

@NgModule({
    declarations: [
        InputMessageComponent,
        GoogleMapComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule,
    ],
    exports: [
        InputMessageComponent,
        GoogleMapComponent,
    ]
})
export class ComponentsModule { }
