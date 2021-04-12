import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  constructor(private http: HttpClient) { }

  Url = 'http://localhost:9090/api/asignatura/';
  
  getAsignatura(id:number): Observable<any> {
    return this.http.get<any[]>(this.Url+"/"+id).pipe(catchError(this.handleError));
  }

  getAsignaturaAll(): Observable<any> {
    return this.http.get<any[]>(this.Url).pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError(error.message || "Error servidor");
  }

}
