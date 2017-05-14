import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

@Injectable()
export class UserPresenceService {

	user: Observable<firebase.User>;
	User:any;
	public userDetails;
	constructor(private afd:AngularFireDatabase,
	            public afAuth:AngularFireAuth,
			private router:Router,
			private flash: FlashMessagesService){
		this.user = afAuth.authState;
	}

	loginWithGoogle()
	{
		this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then(user => {
			this.afd.object('/users/'+user.uid).update({email: user.email, name: user.displayName, phone: null});
			user.updateProfile({displayName : user.name, photoURL: 'http://www.filecluster.com/howto/wp-content/uploads/2014/07/User-Default.jpg'})
		}).catch(err => {
				this.flash.show(err.message, {cssClass:'alert-danger', timeout:5000});
		});
		this.router.navigate(['']);
	}

	loginWithFacebook()
	{
		this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()).catch(err => {
				this.flash.show(err.message, {cssClass:'alert-danger', timeout:5000});
		});	
		this.router.navigate(['']);
	}

	login(username, password)
	{
		this.afAuth.auth.signInWithEmailAndPassword(username, password).catch(err =>{
				this.flash.show(err.message, {cssClass:'alert-danger', timeout:5000});
		});
		this.router.navigate(['']);
	}

	logout()
	{
		this.afAuth.auth.signOut();
		this.router.navigate(['']);
	}
}
