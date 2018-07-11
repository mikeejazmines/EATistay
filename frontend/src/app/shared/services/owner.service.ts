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
export class OwnerService {

  constructor(private http: HttpClient) { }

  addMeal(name: string, description: string, price: number): Observable<any> {
    return this.http.post('http://localhost:3000/addMeal', {meal_name: name, meal_description: description, meal_price: price}, httpOptions)
    .pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  editMeal(name: string, description: string, price: number, id: number) {
    console.log('NAME: ' + name);
    console.log('DESCRIPTION: ' + description);
    console.log('PRICE: ' + price);
    console.log('ID: ' + id);

    return this.http.put('http://localhost:3000/editMeal',
    {name: name, description: description, price: price, meal_id: id}, httpOptions)
    .pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  getMeals(id: number): Observable<Object> {
    const url = `http://localhost:3000/getMeals/${id}`;
    return this.http.get(url).pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  getMeal(id: number): Observable<any> {
    const url = `http://localhost:3000/getMeal/${id}`;
    return this.http.get(url).pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  getReservations(id: number): Observable<Object> {
    const url = `http://localhost:3000/getReservations/${id}`;
    return this.http.get(url).pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  getReservation(id: number): Observable<Object> {
    const url = `http://localhost:3000/getReservation/${id}`;
    return this.http.get(url).pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  getReviews(id: number): Observable<Object> {
    const url = `http://localhost:3000/getReviews/${id}`;
    return this.http.get(url).pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  getRestaurant(id: number): Observable<any> {
    const url = `http://localhost:3000/getRestaurant/${id}`;
    return this.http.get(url).pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  deleteMeal(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/deleteMeal/${id}`, httpOptions).pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

  confirm(resID: number): Observable<Object> {
    return this.http.post('http://localhost:3000/confirm', {id: resID}, httpOptions)
    .pipe(catchError( (error) => {
      return throwError(error);
    }));
  }

}
