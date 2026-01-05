import { inject, Injectable, signal } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore, orderBy, query, serverTimestamp, setDoc } from '@angular/fire/firestore';
import { AuthService } from './auth-service';
import { Track } from '../../models/app-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  fireStore = inject(Firestore);
  auth = inject(AuthService);


  getFavoriteSongs(uid: string): Observable<Track[]>{
    const songsRef = collection(this.fireStore, `users/${uid}/favorites`);
    const q = query(songsRef, orderBy('addAt', 'desc'));

    return collectionData(q, { idField: 'id'}) as Observable<Track[]>;
  }

  async addSongToFavorite(uid: string, track: Track){
    const trackDocRef = doc(this.fireStore, `users/${uid}/favorites/${track.id}`);
    await setDoc(trackDocRef, {...track, addAt: serverTimestamp()});
  }

  async removeLike(uid: string, trackId: string){
  const trackDocRef = doc(this.fireStore, `users/${uid}/favorites/${trackId}`);
   await deleteDoc(trackDocRef);
  }
}
