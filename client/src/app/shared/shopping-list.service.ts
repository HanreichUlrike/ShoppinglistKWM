import {Injectable} from '@angular/core';
import {Shoppinglist, Article} from "./shoppinglist";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs" ;
import {catchError, retry, take} from 'rxjs/operators' ;
import {User} from "./user";

@ Injectable()
export class ShoppingListService {

    private api = 'http://shoppinglistkwm.s1710456011.student.kwmhgb.at/api';

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Array<Shoppinglist>> {
        return this.http.get(` ${this.api}/shoppinglists`).pipe(retry(3)).pipe(catchError(this.errorHandler))
    }

    getSingle(id: string): Observable<Shoppinglist> {
        return this.http.get<Shoppinglist>(` ${this.api}/shoppinglist/${id} `).pipe(retry(3)).pipe(catchError(this.errorHandler))
    }

    create(shoppinglist: Shoppinglist): Observable<any> {
        return this.http.post(`${this.api}/shoppinglist`, shoppinglist).pipe(retry(3)).pipe(catchError(this.errorHandler))
    }

    update(shoppinglist: Shoppinglist): Observable<any> {
        return this.http.put(`${this.api}/shoppinglist/${shoppinglist.id} `, shoppinglist).pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    remove(id: number): Observable<any> {
        return this.http.delete(`${this.api}/shoppinglist/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    getUser(id: string): Observable<User> {
        return this.http.get(` ${this.api}/users/${id} `).pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    private errorHandler(error: Error | any): Observable<any> {
        return throwError(error);
    }


}
