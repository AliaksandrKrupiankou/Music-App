import { Timestamp } from "firebase/firestore";
import { Track } from "./app-interface";

export interface Playlist {
    id?: string;
    title: string;
    coverUrl: string | null;
    tracks: Track[];
    authorId: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}



