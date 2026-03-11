import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  docData,
  Firestore,
  orderBy,
  serverTimestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { FIRESTORE_COLLECTIONS } from '../utils/constants/firestore.constants';
import { Playlist } from '../../models/playlist-model';
import { firstValueFrom, Observable } from 'rxjs';
import { arrayRemove, arrayUnion, doc, query, setDoc } from 'firebase/firestore';
import { FileUploadService } from './file-upload.service';
import { Track } from '../../models/app-interface';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
  firestore = inject(Firestore);
  fileUpload = inject(FileUploadService);
  private injector = inject(EnvironmentInjector);

  async createPlaylist(uid: string) {
    const playlistRef = collection(this.firestore, `${FIRESTORE_COLLECTIONS.PLAYLISTS}`);

    const newPlaylist = {
      title: 'New playlist',
      coverUrl: 'https://i.ibb.co/TM7YpRKH/chrome-gn-D105t-VDl.png',
      tracks: [] as Track[],
      authorId: uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const playlistId = await addDoc(playlistRef, newPlaylist);

    return playlistId.id;
  }

  getById(id: string): Observable<Playlist | undefined> {
    const docRef = doc(this.firestore, `${FIRESTORE_COLLECTIONS.PLAYLISTS}/${id}`);

    return docData(docRef, { idField: 'id' }) as Observable<Playlist>;
  }

  async updatePlaylist(id: string, data: any) {
    const docRef = doc(this.firestore, `${FIRESTORE_COLLECTIONS.PLAYLISTS}/${id}`);

    const updateData = {
      ...data,
      updatedAt: serverTimestamp(),
    };

    if (updateData.coverUrl instanceof File) {
      try {
        const url = await firstValueFrom(this.fileUpload.upload(updateData.coverUrl));
        updateData.coverUrl = url;
      } catch (err) {
        console.error('Error of upload playlist cover:', err);
      }
    }

    return await updateDoc(docRef, updateData);
  }

  async deletePlaylist(id: string) {
    const docRef = doc(this.firestore, `${FIRESTORE_COLLECTIONS.PLAYLISTS}/${id}`);

    await deleteDoc(docRef);
  }

  getUserPlaylists(userId: string): Observable<Playlist[]> {
    const playlistsRef = collection(this.firestore, `${FIRESTORE_COLLECTIONS.PLAYLISTS}`);

    const q = query(playlistsRef, where('authorId', '==', userId), orderBy('createdAt', 'desc'));

    return runInInjectionContext(
      this.injector,
      () => collectionData(q, { idField: 'id' }) as Observable<Playlist[]>,
    );
  }

  async addTrackToPlaylist(playlistId: string, track: Track) {
    const docRef = doc(this.firestore, `${FIRESTORE_COLLECTIONS.PLAYLISTS}/${playlistId}`);

    await updateDoc(docRef, {
      tracks: arrayUnion(track),
      updatedAt: serverTimestamp(),
    });
  }

  async removeTrackFromPlaylist(playlistId: string, track: Track) {
    const docRef = doc(this.firestore, `${FIRESTORE_COLLECTIONS.PLAYLISTS}/${playlistId}`);

    return await updateDoc(docRef, {
      tracks: arrayRemove(track),
      updatedAt: serverTimestamp(),
    });
  }
}
