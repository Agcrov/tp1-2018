import {AfterContentInit, Component, OnInit} from '@angular/core';
import {Movie} from '../movie';
import {Image, MoviesService} from '../movies.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Cast} from '../cast';
import {Crew} from '../crew';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, AfterContentInit {
  movie: Movie;
  cast: Cast[];
  crew: Crew[];
  director: Crew;
  movieSimilar: Movie[];
  movieBackdrops: Image[];
  moviePosters: Image[];



  constructor(
    private moviesService: MoviesService,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    const id = Number(this._activeRoute.snapshot.params['id']);
    console.log('on init');
    this.getMovie(id);
    this.getMovieCredits(id);
    this.getMovieSimilar(id);
    this.getMovieImages(id);
  }
  ngAfterContentInit() {
    console.log('after content init');
  }

  // onBack(): void {
  //   this._router.navigate(['product']);
  // }
  getMovie(id: number): void {
    this.moviesService.getMovie(id).subscribe(
      result => this.movie = result
    );
  }
  getMovieCredits(movieId: number): void {
    this.moviesService.getMovieCredits(movieId)
      .subscribe(credits => {
        this.cast = credits['cast'];
        this.crew = credits['crew'];
        console.log(credits['crew']);
        this.director = this.crew.filter(person => person.job === 'Director').pop();
      });
  }
  getMovieSimilar(movieId: number): void {
    this.moviesService.getMovieSimilar(movieId)
      .subscribe(movies => this.movieSimilar = movies['results']);
  }
  getMovieImages(movieId: number): void {
    this.moviesService.getMovieImages(movieId)
      .subscribe( images => {
        this.movieBackdrops = images['backdrops'];
        this.moviePosters = images['posters'];
      });
  }
  getPosterUrl(): string {
    return 'url(\'https://image.tmdb.org/t/p/w342/' + this.movie.poster_path + '\')';
  }
  getBackdropUrl(): string {
    return 'url(\'https://image.tmdb.org/t/p/w1400_and_h450_face/' + this.movie.backdrop_path + '\')';
  }
  getImageUrl(img: Image): string {
    return 'url(\'https://image.tmdb.org/t/p/original' + img.file_path + '\')';
  }
  getMovieLenght(): string {
    const hours = Math.trunc(this.movie.runtime / 60);
    const minutes = (this.movie.runtime % 60);
    return  hours.toString() + ' h ' + minutes.toString() + ' min';
  }
}

