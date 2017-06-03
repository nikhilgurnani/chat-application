import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserPresenceService } from '../../services/user-presence.service';
import { FirebaseService } from '../../services/firebase.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	username:any;
	password:any;
	constructor(public userPresence:UserPresenceService,
<<<<<<< HEAD
		public flashMessagesService: FlashMessagesService)
	{}

	ngOnInit() {
	}
=======
			public flashMessagesService: FlashMessagesService,
			public router: Router,
			private firebaseService: FirebaseService){}

	ngOnInit() {}
>>>>>>> 1f228e5da62d6da5bea713bdafc57fdc08c7ae93

	loginWithGoogle()
	{
		this.userPresence.loginWithGoogle();
<<<<<<< HEAD
=======
		this.router.navigate(['']).then(k => {
				this.userPresence.afAuth.authState.subscribe(user => {
				if(this.userPresence.afd.object('/users/' + user.uid) == null)
				{
					this.firebaseService.addUser(user.uid, user.email, user.photoURL, user.displayName, user.emailVerified);
					console.log("I reached here");
				}
			});
		});
>>>>>>> 1f228e5da62d6da5bea713bdafc57fdc08c7ae93
	}

	loginWithFacebook()
	{
<<<<<<< HEAD
	this.userPresence.loginWithFacebook();		
=======
		this.userPresence.loginWithFacebook();
		this.router.navigate(['']);		
>>>>>>> 1f228e5da62d6da5bea713bdafc57fdc08c7ae93
	}

	login()
	{
		this.userPresence.login(this.username, this.password);
<<<<<<< HEAD
=======
		this.router.navigate(['']);
>>>>>>> 1f228e5da62d6da5bea713bdafc57fdc08c7ae93
	}
}