import {Genre} from './genre';
import {Company} from './company';
import {Country} from './country';
import {Language} from './language';


export class Movie {
  id: number;
  imdb_id: number;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Movie[];
  budget: number;
  generes: Genre[];
  homepage: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Company[];
  production_countries: Country[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  getPosterUrl(): string {
    return 'url(\'https://image.tmdb.org/t/p/w342/' + this.poster_path + '\')';
  }
  getBackdropUrl(): string {
    return 'url(\'https://image.tmdb.org/t/p/w1400_and_h450_face/' + this.backdrop_path + '\')';
  }
}

