import {Component, OnInit} from '@angular/core';
import {DriveService} from '../../../services/drive/drive.service';

@Component({
    selector: 'app-drive',
    templateUrl: './drive.page.html',
    styleUrls: ['./drive.page.scss'],
})
export class DrivePage implements OnInit {
    loading = true;
    drives = [];

    constructor(
        private readonly driveService: DriveService,
    ) {
        this.driveService.getDrives().subscribe((res: any) => {
            this.drives = res.filter((item) => {
                return (new Date(item.payload.doc.data().start_date) > new Date());
            }).map((it) => {
                return it.payload.doc.data();
            });

            this.loading = false;
        });
    }

    ngOnInit() {
    }

}
