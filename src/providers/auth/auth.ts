import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Auth {

baseUrl:string = "http://www.chikavi.com/api/";
data;
token;

  constructor(public http: HttpClient,
    private plt: Platform,
    private storage: Storage) {
    
  }

  createAuthorizationHeader(headers: Headers){
	    headers.append('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvbG9naW4iLCJpYXQiOjE1MzM2NTQwMTYsImV4cCI6MTUzMzY1NzYxNiwibmJmIjoxNTMzNjU0MDE2LCJqdGkiOiJvcEo4cVp2TTBxU0hpbmlYIn0.yeknM333EA23Hb1o7tbf9kx1qEzcW-GWUWEDBX4WU5Q');
	    /*headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    headers.append('Accept', 'application/json');
	    */console.log(headers);
  	
  }



sendQrCode(dato):any{


  
 return this.http.post(this.baseUrl+"codes/search",dato)
 //.map(this.extractData);


}

  login(data){
  	return this.http.post(this.baseUrl+"login",data)
  	.map(this.extractData);
    this.guardar();
  }

  isLogged(){
    
    
      if(window.localStorage.getItem('token')){
      return true;
      }else{
        return false;
      }
  
  	
  }

  logout(){

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }


   extractData(res : Response){
    let body:any = res;
    //console.log(body);
    this.token = body.token;
    this.user = JSON.stringify(body);
   if(body.success === true){
        localStorage.setItem('token' , body.token);
        localStorage.setItem('user', JSON.stringify(body));
      
  	};
  	return body || {} ;
  }

  guardar(){
     this.storage.set('token',this.token);
     this.storage.set('user',this.user);
     console.log("se supone que se guardo");
  }
}
