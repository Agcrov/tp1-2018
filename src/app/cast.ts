export class Cast {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  order: number;
  profile_path: string;

  getCastPosterUrl(): string{
    return 'url(\'https://image.tmdb.org/t/p/w185/' + this.profile_path + '\')';
  }
}
