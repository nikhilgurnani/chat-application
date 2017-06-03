import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

@Injectable()
export class UserPresenceService {

	user: Observable<firebase.User> = null;
	User:any;
	public userDetails;
	constructor(public afd:AngularFireDatabase,
	            public afAuth:AngularFireAuth,
			private router:Router,
			private flash: FlashMessagesService,
			private firebaseService: FirebaseService){
		
		this.user = this.afAuth.authState;

		this.afAuth.authState.subscribe(user => {
			console.log(user);
			if(user != null)
			{
				if(firebaseService.checkUser(user.uid))
				{
					console.log("User already stored");
				}
				else 
				{
					console.log("User doesn't exist");
					firebaseService.addUser(user.uid, user.email, user.photoURL, user.displayName, user.emailVerified);
				}
			}
			else if(user == null)
			{
				console.log("No user logged in.");
			}
		});
	}



	loginWithGoogle()
	{
		this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).catch(err => {
				this.flash.show(err.message, {cssClass:'alert-danger', timeout:5000});
		});

	}

	loginWithFacebook()
	{
		this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()).catch(err => {
				this.flash.show(err.message, {cssClass:'alert-danger', timeout:5000});
		});	
	}

	login(username, password)
	{
		this.afAuth.auth.signInWithEmailAndPassword(username, password).catch(err =>{
				this.flash.show(err.message, {cssClass:'alert-danger', timeout:5000});
		});
	}

	logout()
	{
		this.afAuth.auth.signOut();
		this.router.navigate(['']);
	}
}

interface User
{
	$displayName?:string;
	$email?:string;
	$photoURL?:string;
	$isVerified?:boolean;
}