export class People {
  birthday: string;
  known_for_department: string;
  deathday: string;
  id: number;
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
  adult: boolean;
  imdb_id: string;
  homepage: string;

  getCreditPosterUrl(): string{
    return 'url(\'https://image.tmdb.org/t/p/w185/' + this.profile_path + '\')';
  }
}

