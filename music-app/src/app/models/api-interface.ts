export interface ApiQualityUrl {
  quality: string;
  url: string;
}

export interface ApiArtist {
  id: string;
  name: string;
  role: string;
  type: string;
  image: ApiQualityUrl[] | boolean;
  url: string;
}

export interface ApiAlbum {
  id: string | null;
  name: string | null;
  url: string | null;
}

export interface ApiSong {
  id: string;
  name: string;
  type: string;
  year: string | null;
  releaseDate: string | null;
  duration: number | string | null;
  label: string | null;
  explicitContent: boolean;
  playCount: number | string | null;
  language: string;
  hasLyrics: boolean;
  lyricsId: string | null;
  url: string;
  copyright: string | null;

  album: ApiAlbum;

  artists: {
    primary: ApiArtist[];
    featured: ApiArtist[];
    all: ApiArtist[];
  };

  image: ApiQualityUrl[];
  downloadUrl: ApiQualityUrl[];
}

export interface ApiSearchResponse {
  success: boolean;
  data: {
    total: number;
    start: number;
    results: ApiSong[];
  };
}

export interface ApiAlbumFull {
  id: string;
  name: string;
  description: string;
  year: string | null;
  type: string;
  playCount: string | null;
  language: string;
  explicitContent: boolean;
  artists: {
    primary: ApiArtist[];
    featured: ApiArtist[];
    all: ApiArtist[];
  };
  songCount: string | null;
  url: string;
  image: ApiQualityUrl[];
  songs: ApiSong[];
}

export interface ApiAlbumResponse {
  success: boolean;
  data: ApiAlbumFull;
}
