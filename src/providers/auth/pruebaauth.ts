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

  constructor(public http: HttpClient,
    public platform: Platform,
    private storage: Storage) {
    
  }

  createAuthorizationHeader(headers: Headers){
	    headers.append('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvbG9naW4iLCJpYXQiOjE1MzM2NTQwMTYsImV4cCI6MTUzMzY1NzYxNiwibmJmIjoxNTMzNjU0MDE2LCJqdGkiOiJvcEo4cVp2TTBxU0hpbmlYIn0.yeknM333EA23Hb1o7tbf9kx1qEzcW-GWUWEDBX4WU5Q');
	    /*headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    headers.append('Accept', 'application/json');
	    */console.log(headers);
  	
  }


/*
  private(){

   let authHeader = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvbG9naW4iLCJpYXQiOjE1MzM2NTQwMTYsImV4cCI6MTUzMzY1NzYxNiwibmJmIjoxNTMzNjU0MDE2LCJqdGkiOiJvcEo4cVp2TTBxU0hpbmlYIn0.yeknM333EA23Hb1o7tbf9kx1qEzcW-GWUWEDBX4WU5Q';
   

  	let headersObj = new Headers();
    headersObj.append('authorization', authHeader);
    console.log(authHeader);;
  
  	return this.http.get("http://127.0.0.1:8000/api/movies",{
     headers : headersObj
   }).map(res => res);
  }
*/

sendQrCode(dato):any{


  
 return this.http.post(this.baseUrl+"codes/search",dato)
 //.map(this.extractData);


}

  login(data){
  	return this.http.post(this.baseUrl+"login",data)
  	.map(this.extractData);
  }

  isLogged(){
     if(this.platform.is('cordova')){
      this.storage.ready()
            .then(()=>{

              this.storage.get("token")
                  .then( token =>{
                    resolve();
                  });
            })
    }else{
      if(window.localStorage.getItem('token')){
      return true;
      }else{
        return false;
      }
    }
  	
  }

  logout(){
    if(this.platform.is('cordova')){

    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }


  private extractData(res : Response){
    let body:any = res;
    console.log(body);

    if(body.success === true){
      if(this.platform.is('cordova')){
        this.storage.set('token',body.token);
        this.storage.set('user',JSON.stringify(body));
      }else{
        localStorage.setItem('token' , body.token);
        localStorage.setItem('user', JSON.stringify(body));
      }
  	};
  	return body || {} ;
  }
}
