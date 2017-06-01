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