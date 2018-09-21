import { Component, OnInit, Input } from '@angular/core';
import {Movie} from '../movie';

@Component({
  selector: 'app-movie-wildcard',
  templateUrl: './movie-wildcard.component.html',
  styleUrls: ['./movie-wildcard.component.scss']
})
export class MovieWildcardComponent implements OnInit {
  @Input() movie: Movie;

  constructor() { }

  ngOnInit() {
  }

  getUrl(): string {
    return 'url(\'https://image.tmdb.org/t/p/w185/' + this.movie.poster_path + '\')';
  }
  getCircularProgres(): string {
    return 'circular-progress(100, ' + this.movie.vote_average + ', #03A9F4, #E0E0E0)';
  }
  // getMovie(movieId: number): void {
  //   this.movieService.getMovie(movieId)
  //     .subscribe(movie => this.movie = movie);
  //   // console.log(this.movie);
  // }
}
