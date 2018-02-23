import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {NgModule} from '@angular/core';
import {BrowserModule,} from '@angular/platform-browser';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {
  authToken : any;//property for token 
  user: any;// for user

  constructor(private http : Http) { }

  registerUser(user){
    var headers = new Headers();//set Header value
     headers.append('Content-Type','application/json');// add content type of Json 
     return this.http.post('http://localhost:3000/users/register',user,{headers: headers})// return observable with response 
     .map(res => res.json());
  }
 
  authenticateUser(user){
    let headers = new Headers();
     headers.append('Content-Type','application/json');
     return this.http.post('http://localhost:3000/users/authenticate',user,{headers: headers})
     .map(res => res.json());
  }

  getProfile(){
  //  debugger
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers: headers})
    .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);//Save the Token on local storage 
    localStorage.setItem('user', JSON.stringify(user));//Save the user in local storage 
    this.authToken = token;
    this.user = user;
  }

  // fetching out token from local storage 
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
  if(localStorage.getItem("id_token")){
    return true;
  }else{
    return false;
  }
}



  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  } 

}


//https://github.com/auth0/angular2-jwt#checking-authentication-to-hideshow-elements-and-handle-routing