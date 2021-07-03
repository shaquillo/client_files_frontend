import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { Client } from './client-file.client';

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) { }

  private clientUrl = 'https://jsonplaceholder.typicode.com/todos/1';

  getClients(): Observable<Client[]> {
      return this.http.get<Client[]>(this.clientUrl).pipe(
            tap(_ => console.log('fetched heroes')),
            catchError(this.handleError<Client[]>('getClients', []))
          );
  }

  postClient(client: Client): Observable<Client> {
      return this.http.post<Client>(this.clientUrl, client).pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<Client>('getClients'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
  
      console.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }

  
}