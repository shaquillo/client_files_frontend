import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { Client } from './client-file.client';

const headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "*/*")
    .set("Access-Control-Allow-Origin", "http://localhost:4200");

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) { }


  private clientUrl = 'https://client-file.herokuapp.com/risk-management/client';
  // private clientUrl = 'http://localhost:8085/risk-management/client';

  getClients(): Observable<Client[]> {
      return this.http.get<Client[]>(this.clientUrl, {headers}).pipe(
            tap(_ => console.log('fetched clients')),
            catchError(this.handleError<Client[]>('getClients', []))
          );
  }

  postClient(client: Client): Observable<Client> {
      return this.http.post<Client>(this.clientUrl, client, {headers}).pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<Client>('getClients'))
      );
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(this.clientUrl, client, {headers}).pipe(
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