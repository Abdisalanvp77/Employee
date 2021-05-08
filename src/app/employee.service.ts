
/**
 * The project front end is currently built on an array and needs to use a JSON file.
 * This employee service (to be completed ) will be used to access the json file and conduct the 
 * CRUD operations of the employee system.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,  HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
import {catchError, retry} from 'rxjs/internal/operators';
import { HttpHeaders } from '@angular/common/http';
import { Employee } from './Employee';
import { of } from 'rxjs';
const localUrl = './employees.json';
const apiUrl = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'jwt-token'
  })
};


@Injectable()
export class EmployeeService {
   constructor(private http: HttpClient){};
   

   getEmployees(): Observable<HttpResponse<Employee[]>> {
       return this.http.get<Employee[]>(localUrl, {observe: 'response'});
   }

   addEmployee(employee: Employee) : Observable<Employee> {
       return this.http.post<Employee>(localUrl, employee, httpOptions)
        .pipe(
            catchError(this.handleError('addEmployee', employee))
          );;
   }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}