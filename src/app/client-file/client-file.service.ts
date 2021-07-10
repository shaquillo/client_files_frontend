import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { Client } from './client-file.client';

const headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "*/*");

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) { }


  private clientUrl = 'https://client-file.herokuapp.com/risk-management/client';
  // private clientUrl = 'http://localhost:8085/risk-management/client';

  private noteDocUrl = this.clientUrl + 'note/file/';

  getClients(): Observable<Client[]> {
      return this.http.get<Client[]>(this.clientUrl, {headers}).pipe(
            tap(_ => console.log('fetched clients')),
            catchError(this.handleError<Client[]>('getClients', []))
          );
  }

  postClient(client: Client): Observable<Client> {
      return this.http.post<Client>(this.clientUrl, client, {headers}).pipe(
        tap(_ => console.log('post clients')),
        catchError(this.handleError<Client>('postClients'))
      );
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(this.clientUrl, client, {headers}).pipe(
      tap(_ => console.log('update clients')),
      catchError(this.handleError<Client>('updateClients'))
    );
}

downloadNoteDoc(filename: String): Observable<any> {
  return this.http.get(this.noteDocUrl + filename, {headers}).pipe(
    tap(_ => console.log('downloading note doc clients')),
    catchError(this.handleError<Client>('downloadNoteDoc'))
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