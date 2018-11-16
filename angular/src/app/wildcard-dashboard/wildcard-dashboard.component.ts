import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../movies.service';
import {Movie} from '../movie';

@Component({
  selector: 'app-wildcard-dashboard',
  templateUrl: './wildcard-dashboard.component.html',
  styleUrls: ['./wildcard-dashboard.component.scss']
})
export class WildcardDashboardComponent implements OnInit {

  movies: Movie[];
  constructor(private _movieService: MoviesService) { }

  ngOnInit() {
    this.getNowPlayingMovies();
  }

  getNowPlayingMovies(): void {
    this._movieService.getNowPlayingMovies()
      .subscribe( movies => this.movies = movies['results'] );
  }

}
