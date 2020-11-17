import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {DriveInfo} from './drive-info';

@Injectable({
    providedIn: 'root'
})
export class DriveInfoService {
    driveInfoCollection: AngularFirestoreCollection<DriveInfo>;
    driveInfoDoc: AngularFirestoreDocument<DriveInfo>;

    constructor(private readonly afs: AngularFirestore) {
        this.driveInfoCollection = this.afs.collection('drive-info');
    }


    getDriveInfos() {
        return this.driveInfoCollection.snapshotChanges();
    }

    create(data: DriveInfo) {
        return this.driveInfoCollection.add(data);
    }

    delete(id: string) {
        return this.afs.doc<DriveInfo>(`drive-info/${id}`).delete();
    }
}
