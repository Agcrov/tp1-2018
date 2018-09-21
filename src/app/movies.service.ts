import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import { MessageService } from './message.service';
import {Movie} from './movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '?api_key=77012f724db16b13bbfe1737d9ae3903';
  private apiLan = '&language=es-AR';

  // https://api.themoviedb.org/3/movie/550?api_key=77012f724db16b13bbfe1737d9ae3903
  // https://api.themoviedb.org/3/movie/550?api_key=77012f724db16b13bbfe1737d9ae3903&language=es-AR
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // "http://localhost:4200/?api_key=77012f724db16b13bbfe1737d9ae3903movie/550https://api.themoviedb.org/3/&language=es-AR"
  getMovie(movieId: number): Observable<Movie> {
    const url = `${this.apiUrl}/movie/${movieId}${this.apiKey}${this.apiLan}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`fetched movie id=${movieId}`)),
      catchError(this.handleError<Movie>(`getMovie id=${movieId}`))
    );
  }
  /** GET movie by id. Return `undefined` when id not found */
  getMovieNo404<Data>(movieId: number): Observable<Movie> {
    const url = `${this.apiUrl}movie/${movieId}${this.apiKey}${this.apiLan}`;
    return this.http.get<Movie[]>(url)
      .pipe(
        map(movies => movies[0]), // returns a {0|1} element array
        tap(movie => {
          const outcome = movie ? `fetched` : `did not find`;
          this.log(`${outcome} movie id=${movieId}`);
        }),
        catchError(this.handleError<Movie>(`getMovie id=${movieId}`))
      );
  }

  // https://api.themoviedb.org/3/movie/550/credits?api_key=<<api_key>>
  getMovieCredits(movieId: number): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}/credits${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched movie credits for id=${movieId}`)),
      catchError(this.handleError<any>(`getMovieCredits id=${movieId}`))
    );

  }
  // https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
  getNowPlayingMovies(): Observable<Movie[]> {
    const url = `${this.apiUrl}/movie/now_playing${this.apiKey}${this.apiLan}&page=1`;
    return this.http.get<Movie[]>(url).pipe(
      tap(_ => this.log(`fetched now playing movies`)),
      catchError(this.handleError<Movie[]>(`getNowPlayingMovie error`))
    );
  }


  // /search/movie?api_key=XXX&language=en-US&query=pink%20floyd&page=1&include_adult=false
  searchMovie(query: string): Observable<Movie[]> {
    if (!query.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    query = encodeURI(query);
    return this.http
      .get<Movie[]>(`${this.apiUrl}/search/movie${this.apiKey}${this.apiLan}&query=${query}&page=1&include_adult=false`)
      .pipe(
        tap(_ => this.log(`movie matching "${query}"`)),
        catchError(this.handleError<Movie[]>('searchMovie', []))
      );
  }




  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`MoviesService: ${message}`);
  }
}
