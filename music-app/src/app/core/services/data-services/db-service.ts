import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from '@angular/fire/firestore';
import { AuthService } from '../auth-service';
import { Track } from '../../../models/app-interface';
import { Observable } from 'rxjs';
import { FIRESTORE_COLLECTIONS } from '../../utils/constants/firestore.constants';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  fireStore = inject(Firestore);
  auth = inject(AuthService);

  private injector = inject(EnvironmentInjector);

  getFavoriteSongs(uid: string): Observable<Track[]> {
    const songsRef = collection(
      this.fireStore,
      `${FIRESTORE_COLLECTIONS.USERS}/${uid}/${FIRESTORE_COLLECTIONS.FAVORITES}`
    );
    const q = query(songsRef, orderBy('addAt', 'desc'));

    return  runInInjectionContext(this.injector ,() => collectionData(q, { idField: 'id' }) as Observable<Track[]>) ;
  }

  async addSongToFavorite(uid: string, track: Track) {
    const trackDocRef = doc(
      this.fireStore,
      `${FIRESTORE_COLLECTIONS.USERS}/${uid}/${FIRESTORE_COLLECTIONS.FAVORITES}/${track.id}`
    );
    await runInInjectionContext(this.injector ,() => setDoc(trackDocRef, { ...track, addAt: serverTimestamp() }));
  }

  async removeLike(uid: string, trackId: string) {
    const trackDocRef = doc(
      this.fireStore,
      `${FIRESTORE_COLLECTIONS.USERS}/${uid}/${FIRESTORE_COLLECTIONS.FAVORITES}/${trackId}`
    );
    await runInInjectionContext(this.injector ,() => deleteDoc(trackDocRef));
  }
}
