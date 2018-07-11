import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/Login', {email: email, password: password}, httpOptions).pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  checkLogin(): Observable<Object> {
    return this.http.get('http://localhost:3000/checkLogin', httpOptions).pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  signup(email: string, password: string, name: string, type: string): Observable<any> {
    return this.http.post('http://localhost:3000/newUser', {email: email, password: password, name: name,
    type: type}, httpOptions)
    .pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  setRestoID(): Observable<any> {
    return this.http.post('http://localhost:3000/setRestoID', {}, httpOptions)
    .pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  addNewRestaurant(name: string, description: string, location: string, owner_id: string,
    opening: string, closing: string, limit: string): Observable<any> {
      console.log('Adding new Resto');
    return this.http.post('http://localhost:3000/newRestaurant', {
      name: name, description: description, location: location, owner_id: owner_id, opening: opening,
      closing: closing, limit: limit}, httpOptions)
    .pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  logout() {
    return this.http.post('http://localhost:3000/logout', {}, httpOptions)
    .pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  setReservation(dt: string, name: string, custID: number, restoName: string, restoID: number): Observable<any> {
    console.log('in');
    return this.http.post('http://localhost:3000/newReservation',
    {customer_id: custID, customer_name: name, resto_id: restoID, resto_name: restoName, resdate: dt}, httpOptions)
    .pipe(catchError( (error) => {
      console.log(error);
      return throwError(error);
    }));
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/deleteReservation/${id}`, httpOptions).pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  sendReview(review: string, custID: number, name: string, restoID: number): Observable<any> {
    console.log('in');
    return this.http.post('http://localhost:3000/makeReview',
    {review_body: review, customer_id: custID, customer_name: name, resto_id: restoID}, httpOptions)
    .pipe(catchError( (error) => {
      console.log('sad');
      console.log(error);
      return throwError(error);
    }));
  }

  getCustomerReservations(id: number): Observable<Object> {
    const url = `http://localhost:3000/getCustomerReservations/${id}`;
    return this.http.get(url).pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

}
