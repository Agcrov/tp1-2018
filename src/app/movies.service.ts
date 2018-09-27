import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import { MessageService } from './message.service';
import {Movie} from './movie';
// import {Router} from "@angular/router";

export interface Image {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
export interface APIToken{
  success: boolean;
  expires_at: string;
  request_token: string;
}
export interface APIGuestSession {
  success: boolean;
  expires_at: string;
  guest_session_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '?api_key=77012f724db16b13bbfe1737d9ae3903';
  private apiLan = '&language=es-AR';
  private guestSession: APIGuestSession;
  // private token: APIToken;
  // private session: string;


  // https://api.themoviedb.org/3/movie/550?api_key=77012f724db16b13bbfe1737d9ae3903
  // https://api.themoviedb.org/3/movie/550?api_key=77012f724db16b13bbfe1737d9ae3903&language=es-AR
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    // private router: Router
  ) {
    if (!this.guestSession) {
      this.initApiGuestSession();
    }
  }

  // getApiToken(): Observable<APIToken>{
  //   const url = `${this.apiUrl}/authentication/token/new${this.apiKey}`;
  //   return this.http.get<APIToken>(url).pipe(
  //     tap(res => this.log(`fetched token=${res['request_token']}`)),
  //     catchError(this.handleError<APIToken>(`getApiToken error`))
  //   );
  // }

  // getAPISession(): void {
  //   this.getApiToken().subscribe(
  //     res => {
  //       this.token= res;
  //       // Authenticate token
  //       // https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}
  //       const currentUrl = this.router.url;
  //       console.log(this.token.request_token, this.token.success, currentUrl);
  //       // window.location.href = `${this.apiUrl}/authentication/${this.token.request_token}?redirect_to=http://localhost:4200${currentUrl}`;
  //       const url = `${this.apiUrl}/authentication/session/new${this.apiKey}`;
  //       this.http.post<any>(url,this.token.request_token,this.httpOptions).pipe(
  //         tap(res => this.log(`fetched session=${res['session_id']}`)),
  //         catchError(this.handleError<APIToken>(`getApiSession`))
  //       ).subscribe(
  //         res => {
  //           if (res['success']){
  //             console.log('session generated');
  //             this.session = res['session_id']
  //           }
  //         }
  //       );
  //     });
  // }
  initApiGuestSession(): void {
    const url = `${this.apiUrl}/authentication/guest_session/new${this.apiKey}`;
    this.http.get<APIGuestSession>(url).subscribe(
      res => {
        this.guestSession = res
      }
    )
  }
  // "http://localhost:4200/?api_key=77012f724db16b13bbfe1737d9ae3903movie/550https://api.themoviedb.org/3/&language=es-AR"
  getMovie(movieId: number): Observable<Movie> {
    // const url = `${this.apiUrl}/movie/${movieId}${this.apiKey}${this.apiLan}`;
    const url = `${this.apiUrl}/movie/${movieId}${this.apiKey}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`fetched movie id=${movieId}`)),
      catchError(this.handleError<Movie>(`getMovie id=${movieId}`))
    );
  }
  getMovieNo404<Data>(movieId: number): Observable<Movie> {
    const url = `${this.apiUrl}/movie/${movieId}${this.apiKey}`;
    // const url = `${this.apiUrl}movie/${movieId}${this.apiKey}${this.apiLan}`;
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
  getMovieCredits(movieId: number): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}/credits${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched movie credits for id=${movieId}`)),
      catchError(this.handleError<any>(`getMovieCredits id=${movieId}`))
    );
  }
  getMovieSimilar(movieId: number): Observable<Movie[]> {
    const url = `${this.apiUrl}/movie/${movieId}/similar${this.apiKey}&page=1`;
    return this.http.get<Movie[]>(url).pipe(
      tap(_ => this.log(`fetched similar movie for id=${movieId}`)),
      catchError(this.handleError<any>(`getMovieSimilar id=${movieId}`))
    );
  }
  getMovieRecomendations(movieId: number): Observable<Movie[]> {
    const url = `${this.apiUrl}/movie/${movieId}/recommendations${this.apiKey}&page=1`;
    return this.http.get<Movie[]>(url).pipe(
      tap(_ => this.log(`fetched recommended movies for id=${movieId}`)),
      catchError(this.handleError<any>(`getMovieRecomendations id=${movieId}`))
    );
  }
  getMovieImages(movieId: number): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}/images${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched movie images for id=${movieId}`)),
      catchError(this.handleError<any>(`getMovieImages id=${movieId}`))
    );
  }
  getNowPlayingMovies(): Observable<Movie[]> {
    const url = `${this.apiUrl}/movie/now_playing${this.apiKey}&page=1`;
    return this.http.get<Movie[]>(url).pipe(
      tap(_ => this.log(`fetched now playing movies`)),
      catchError(this.handleError<Movie[]>(`getNowPlayingMovie error`))
    );
  }
  searchMovie(query: string): Observable<Movie[]> {
    if (!query.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    query = encodeURI(query);
    return this.http
      .get<Movie[]>(`${this.apiUrl}/search/movie${this.apiKey}&query=${query}&page=1&include_adult=false`)
      .pipe(
        tap(_ => this.log(`movie matching "${query}"`)),
        catchError(this.handleError<Movie[]>('searchMovie', []))
      );
  }

  voteMovie (movieId: string, vote: number): Observable<any> {
    // let body:any = {};
    // body.value = vote;
    const url = `${this.apiUrl}/movie/${movieId}/rating${this.apiKey}&guest_session_id=${this.guestSession.guest_session_id}`;
    return this.http.post(
      url,
      {"value": vote * 2}
    ).pipe(
      tap(res => this.log(`rate by ${vote} movie w/ id=${movieId}`)),
      catchError(this.handleError<any>('voteMovie'))
    );
  }
  unvoteMovie (movieId: string): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}/rating${this.apiKey}&guest_session_id=${this.guestSession.guest_session_id}`;
    return this.http.delete(url).pipe(
      tap(res => this.log(`Unrate movie w/ id=${movieId}`)),
      catchError(this.handleError<any>('unvoteMovie'))
    );
  }

  getGuestRatedMovies(): Observable<any>{
    const url = `${this.apiUrl}/guest_session/${this.guestSession.guest_session_id}/rated/movies${this.apiKey}&sort_by=created_at.desc`;
    return this.http.get(url).pipe(
      tap(res => this.log(`Got rated movies for guest w/ id=${this.guestSession.guest_session_id}`))
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
