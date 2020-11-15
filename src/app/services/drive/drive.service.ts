import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Drive} from './drive';

@Injectable({
    providedIn: 'root'
})
export class DriveService {
    driveCollection: AngularFirestoreCollection<Drive>;
    driveDoc: AngularFirestoreDocument<Drive>;

    constructor(private readonly afs: AngularFirestore) {
        this.driveCollection = this.afs.collection('drive', ref => ref.orderBy('published', 'desc'));
    }

    getDrives() {
        return this.driveCollection.snapshotChanges();
    }

    getSingleDriveData(id: string) {
        this.driveDoc = this.afs.doc<Drive>(`drive/${id}`);
        return this.driveDoc.valueChanges();
    }

    create(data: Drive) {
        return this.driveCollection.add(data);
    }

    delete(id: string) {
        return this.afs.doc<Drive>(`drive/${id}`).delete();
    }
}
