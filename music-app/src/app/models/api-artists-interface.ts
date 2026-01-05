export interface ApiQualityUrl {
  quality: string;
  url: string;
}

export interface ApiArtistShort {
  id: string;
  name: string;
  role?: string;
  type: string;
  image: ApiQualityUrl[]; 
  url: string;
}

export interface ApiArtistSearchData {
  total: number;
  start: number;
  results: ApiArtistShort[];
}

export interface ApiArtistSearchResponse {
  success: boolean;
  data: ApiArtistSearchData;
}

export interface Artist{
  id: string;
  name: string;
  role?: string;
  image: string; 
}
