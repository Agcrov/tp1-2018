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
  movieLenght: string;



  constructor(
    private moviesService: MoviesService,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) {
    console.log('on constructor');
    const id = Number(this._activeRoute.snapshot.params['id']);
    this.getMovie(id);
    this.getMovieCredits(id);
    this.getMovieSimilar(id);
    this.getMovieImages(id);
  }

  ngOnInit() {
    console.log('on init');
    this.director = this.crew.filter(person => person.job ==='Director').pop();

    // if (this.crew) {
    //   this.director = this.crew.filter(person => person.job ==='Director').pop();
    //   console.log(this.director.name);
    // }
    // const id = Number(this._activeRoute.snapshot.params['id']);
    // this.getMovie(id);
    // this.getMovieCredits(id);
    // this.getMovieSimilar(id);
    // this.getMovieImages(id);
  }
  ngAfterContentInit() {
    console.log('after content init');
    // console.log(this.crew.length);
    // if (this.crew) {
    //   this.director = this.crew.filter(person => person.job ==='Director').pop();
    //   console.log(this.director.name);
    // }
    // console.log(this.director.name);
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
    // console.log(Math.trunc(this.movie.runtime / 60).toString() + 'h ' + (this.movie.runtime % 60).toString() + 'min');
    const hours = Math.trunc(this.movie.runtime / 60);
    const minutes = (this.movie.runtime % 60);
    return  hours.toString() + 'h ' + minutes.toString() + 'min';
  }
}

