import { Track } from './app-interface';

export interface Image {
  quality: string;
  url: string;
}

export interface ArtistShort {
  id: string;
  name: string;
  role?: string;
  type: string;
  image: Image[];
  url: string;
}

export interface TrackApi {
  id: string;
  name: string;
  type: string;
  year: number | null;
  releaseDate: string | null;
  duration: number | null;
  label: string | null;
  explicitContent: boolean;
  playCount: number | null;
  language: string;
  hasLyrics: boolean;
  url: string;
  image: Image[];
  downloadUrl: Image[];
  album: {
    id: string | null;
    name: string | null;
    url: string | null;
  };
  artists: {
    primary: ArtistShort[];
    featured: ArtistShort[];
    all: ArtistShort[];
  };
}

export interface Album {
  id: string;
  name: string;
  description: string;
  year: number | null;
  type: string;
  songCount: number | null;
  language: string;
  explicitContent: boolean;
  url: string;
  image: Image[];
  songs: TrackApi[] | null;
  artists: {
    primary: ArtistShort[];
    featured: ArtistShort[];
    all: ArtistShort[];
  };
}



export interface ArtistBio {
  text: string | null;
  title: string | null;
  sequence: number | null;
}

export interface ArtistResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    url: string;
    type: string;
    image: Image[];
    followerCount: number | null;
    fanCount: string | null;
    isVerified: boolean | null;
    dominantLanguage: string | null;
    bio: ArtistBio[];
    fb: string | null;
    twitter: string | null;
    wiki: string | null;
    topSongs: TrackApi[];
    topAlbums: Album[];
    singles: TrackApi[];
    similarArtists: Partial<ArtistResponse['data']>[];
  };
}

export interface ArtistProfile {
  id: string;
  name: string;
  image: string;
  fanCount: string | null;
  twitter: string | null;
  topSongs: Track[];
  topAlbums: CompactAlbum[];

  similarArtists: {
    id: string;
    name: string;
    image: string;
  }[];
}

export interface SimilarArtist {
  id: string;
  name: string;
  image: string;
}

export interface CompactAlbum {
  id: string;
  name: string;
  year: number | null;
  image: string;
}

export interface MediaContent {
  id: string;
  name: string; 
  image: string;
  year?: number | null;
}