import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import { MessageService } from './message.service';
import {People} from './people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '?api_key=77012f724db16b13bbfe1737d9ae3903';
  private apiLan = '&language=es-AR';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
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
    this.messageService.add(`PeopleService: ${message}`);
  }

  getPeopleById(personId: number): Observable<People> {
    // baseUrl/person/{person_id}?apikey
    const url = `${this.apiUrl}/person/${personId}${this.apiKey}`;
    return this.http.get<People>(url).pipe(
      tap(_ => this.log(`fetched person id=${personId}`)),
      catchError(this.handleError<People>(`getPeopleById id=${personId}`))
    );
  }
  /** GET movie by id. Return `undefined` when id not found */
  getPeopleByIdNo404<Data>(personId: number): Observable<People> {
    const url = `${this.apiUrl}/person/${personId}${this.apiKey}`;
    return this.http.get<People[]>(url)
      .pipe(
        map(people => people[0]), // returns a {0|1} element array
        tap(person => {
          const outcome = person ? `fetched` : `did not find`;
          this.log(`${outcome} person id=${personId}`);
        }),
        catchError(this.handleError<People>(`getPeople id=${personId}`))
      );
  }
}
