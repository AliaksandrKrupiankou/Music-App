import { inject, Injectable, signal } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
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

    return collectionData(songsRef, { idField: 'id'}) as Observable<Track[]>;
  }

  async addSongToFavorite(uid: string, track: Track){
    const trackDocRef = doc(this.fireStore, `users/${uid}/favorites/${track.id}`);
    await setDoc(trackDocRef, track);
  }

  async removeLike(uid: string, trackId: string){
  const trackDocRef = doc(this.fireStore, `users/${uid}/favorites/${trackId}`);
   await deleteDoc(trackDocRef);
  }
}
