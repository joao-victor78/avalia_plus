export interface Filme {
  id?: number;
  imdbId: string;
  titulo: string;
  diretor: string;
  genero: string;
  ano: number;
  posterUrl: string;
  sinopse: string;
  status: 'ASSISTIDO' | 'QUERO_ASSISTIR';
  nota: number;
  comentario: string;
  dataAssistido: string;
}

export type FilmeFormData = Omit<Filme, 'id'>;
