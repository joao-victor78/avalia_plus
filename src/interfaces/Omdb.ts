export interface OmdbSearchItem {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface OmdbSearchResponse {
  Search?: OmdbSearchItem[];
  Response: 'True' | 'False';
  Error?: string;
}

export interface OmdbMovieDetails {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Director: string;
  Genre: string;
  Plot: string;
  Response: 'True' | 'False';
  Error?: string;
}
