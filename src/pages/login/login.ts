import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import  { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
 /**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private auth: Auth) {
  }
login(FormLogin){
	this.auth.login(FormLogin.value).subscribe((data:any) => {
		if( data.success){
			this.navCtrl.setRoot(HomePage);
		}else{
			console.log("ya vailo");
		}
	});
}


}