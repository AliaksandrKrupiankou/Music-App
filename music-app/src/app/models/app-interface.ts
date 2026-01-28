export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  duration: number;
  audioUrl: string;
  coverUrl: string;
}

export interface Album {
  id: string;
  name: string;
  description: string | null;
  year: string | number | null;
  coverUrl: string;
  artistName: string;
  artistId: string;
  tracks: Track[];
}

export enum PlayingStrategy {
  basicPlaying = 'BASIC_PLAYING',
  repeatPlaylist = 'REPEAT_PLAYLIST',
  repeatCurrentTrack = 'REPEAT_CURRENT_TRACK'
}
