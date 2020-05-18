import {Injectable} from '@angular/core' ;
import {HttpClient} from "@angular/common/http" ;
import * as decode from 'jwt-decode' ;
import { retry } from 'rxjs/operators' ;
import {ShoppingListService} from "./shopping-list.service";

interface User {
  result : {
    created_at : Date,
    email : string,
    id : number,
    firstname : string,
    lastname: string,
    updated_at : Date,
    helper: boolean,
    seeker: boolean
  }
}

@Injectable()
export class AuthService {
  private api :string =
      'http://shoppinglistkwm.s1710456011.student.kwmhgb.at/api/auth';
  constructor(private http:HttpClient, private sl:ShoppingListService ){
  }
  login (email: string, password: string ) {
    return this.http.post(`${this.api}/login`,{'email' : email,
      'password': password});
  }
  public setCurrentUserId(){
    this.http.get <User>(`${this.api}/user` ).pipe(retry (3 )).subscribe (res =>{
          localStorage.setItem ( 'userId',res.result.id.toString());
        }
    );
  }
  public getCurrentUserId(){
    return Number.parseInt(localStorage.getItem('userId'));
  }

  public getCurrentUser(id){
    this.http.get <User>(`${this.api}/user/${id}` ).pipe(retry (3 )).subscribe (res =>{
      localStorage.setItem ( 'seeker',res.result.seeker.toString());
      localStorage.setItem ( 'helper', res.result.helper.toString());
    }
    )};


  public setLocalStorage(token:string) {
    const decodedToken = decode(token);
    console.log (decodedToken.user);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', decodedToken.user.id);
    localStorage.setItem('seeker', decodedToken.user.seeker);
    localStorage.setItem('helper', decodedToken.user.helper);
  }

  logout() {
    this.http.post (`${this.api}/logout`,{});
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem('seeker');
    localStorage.removeItem('helper');
    console.log("logged out");
  }

  public isLoggedIn() {
    if(localStorage.getItem ("token")){
      let token : string = localStorage.getItem("token");
      const decodedToken = decode( token );
      let expirationDate :Date = new Date ( 0 );
      expirationDate.setUTCSeconds(decodedToken.exp);
      if( expirationDate < new Date ()){
        console.log("token expired");
        localStorage.removeItem("token");
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public isSeeker(){
    if(localStorage.getItem("seeker")){
      let seeker : String = localStorage.getItem("seeker");
      console.log(seeker);
      if(seeker == "true"){
        return true;
      }
      return false;
    }
    return false;
  }

  getRole(){
    let user_id = parseInt(localStorage.getItem("userId"));
    this.sl.getUser(user_id.toString()).subscribe( user => { console.log(user)});

  }

  isLoggedOut(){
    return !this.isLoggedIn ();
  }
}
