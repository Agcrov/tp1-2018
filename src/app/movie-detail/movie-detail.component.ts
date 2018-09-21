import { Component, OnInit } from '@angular/core';
import {Movie} from '../movie';
import {MoviesService} from '../movies.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Cast} from '../cast';
import {Crew} from '../crew';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  cast: Cast[];
  crew: Crew[];

  constructor(
    private moviesService: MoviesService,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    const id = Number(this._activeRoute.snapshot.params['id']);
    this.getMovie(id);
    this.getMovieCredits(id);
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
  getPosterUrl(): string {
    return 'url(\'https://image.tmdb.org/t/p/w342/' + this.movie.poster_path + '\')';
  }
  getBackdropUrl(): string {
    return 'url(\'https://image.tmdb.org/t/p/w1400_and_h450_face/' + this.movie.backdrop_path + '\')';
  }

}

