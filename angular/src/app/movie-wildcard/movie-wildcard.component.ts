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
}
