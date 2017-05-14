import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as firebase from 'firebase/app';
@Injectable()
export class FirebaseService {

	user:FirebaseObjectObservable<User>;
	users: FirebaseListObservable<any[]>;
	constructor(private af: AngularFireModule,
	            private afd:AngularFireDatabase,
	            public afAuth: AngularFireAuth,
	            private router:Router,
	            private flash: FlashMessagesService){
	}

	addUser(email, password, u)
	{
		this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user => {
			this.afd.object('/users/'+user.uid).update(u);
			user.updateProfile({displayName : u.name, photoURL: 'http://www.filecluster.com/howto/wp-content/uploads/2014/07/User-Default.jpg'})
		}).catch(err => {
			this.flash.show(err.message, {cssClass: 'alert-danger', timeout:5000});
		});
		//this.router.navigate(['']);
		// if(this.afAuth.auth)
		// {
		// 	this.afAuth.auth.currentUser.updateProfile({displayName: name, photoURL: ""}).catch(err => {
		// 		this.flash.show(err.message, {cssClass: 'alert-danger', timeout:5000});
		// 	});
		// }
	}

	getUserDetails()
	{
		this.user = this.afd.object('/users/'+this.afAuth.auth.currentUser.uid) as FirebaseObjectObservable<User>;
		return this.user;
	}
}

interface User{
	$email?:string;
	$name?:string
	$phone?:string;
}