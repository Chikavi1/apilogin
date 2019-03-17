import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import  { Auth } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

datos =  {"token" : "l6jkkoqs6xl6jkkoqf433s"};
data; 

token: any[];
asientos;
pelicula;
  constructor(public navCtrl: NavController,private auth: Auth) {
    this.data = JSON.parse(localStorage.getItem('user'));

    this.auth.sendQrCode(this.datos)
    .subscribe((data) =>{
     /* 
      this.token = data.data[0].token;
      this.asientos = data.data[0].seats;
      this.pelicula = data.data[0].movies;*/
      this.token = data.id;
      console.log(data.id);
    }
    );

  }

	logout(){
		this.auth.logout();
		this.navCtrl.setRoot(LoginPage);
	}  
}
