import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { FirebaseService }  from './firebase.service';
import * as firebase from 'firebase/app';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Injectable()
export class UserPresenceService {

	user: Observable<firebase.User>;
	User:any;
	constructor(public afAuth:AngularFireAuth,
		private router:Router,
		private firebaseService: FirebaseService,
		private flash: FlashMessagesService)
	{
		this.user = afAuth.authState;
		this.afAuth.authState.subscribe(user => {
			if (user != null)
			{
				if(firebaseService.checkUser(user.uid) == null)
				{
					
				}
			}
			else if(user == null)
			{
				console.log("No user logged in");
			}
		});
	}

	loginWithGoogle()
	{
		return this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).catch(err => {
				this.flash.show(err.message, {cssClass:'alert-danger', timeout:5000});
		});
	}

	loginWithFacebook()
	{
		return this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()).catch(err => {
				this.flash.show(err.message, {cssClass:'alert-danger', timeout:5000});
		});	
	}

	login(username, password)
	{
		return this.afAuth.auth.signInWithEmailAndPassword(username, password).catch(err =>{
				this.flash.show(err.message, {cssClass:'alert-danger', timeout:5000});
		});
	}

	logout()
	{
		this.afAuth.auth.signOut();
	}
}
