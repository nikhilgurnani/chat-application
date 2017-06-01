import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { UserPresenceService } from '../services/user-presence.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as firebase from 'firebase/app';
@Injectable()
export class FirebaseService {

	user:any;
	users: FirebaseListObservable<any[]>;
	contacts: FirebaseListObservable<any[]>;

	constructor(private af: AngularFireModule,
	            private afd:AngularFireDatabase,
	            public afAuth: AngularFireAuth,
	            private router:Router,
	            private flash: FlashMessagesService){
		this.afAuth.authState.subscribe(user => {
			this.user = user;
		})
	}

	addUser(uid, email, photoURL, displayName, isVerified)
	{
		this.afd.object('/users/' + uid).set({email: email, displayName: displayName, photoURL: photoURL, isVerified: isVerified, contacts: null }).catch(error => {
			this.flash.show(error.message, {cssClass: 'alert alert-danger', timeout: 5000});
		});
	}

	registerUser(email, password, displayName)
	{
		this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(a => {
			this.afAuth.authState.subscribe(user => {
				user.updateProfile({displayName: displayName, photoURL: null}).then(() => {
					this.addUser(user.uid, user.email, user.photoURL, user.displayName, user.emailVerified);
				});
			});
		});
		
	}

	getContactsForUser()
	{
		//this.contacts = this.afd.list('/users/'+this.user.uid+'/contacts/') as FirebaseListObservable<Contact[]>;
		this.users = this.afd.list('/users') as FirebaseListObservable<User[]>;
		return this.users;
	}

	addContact(email)
	{
		firebase.auth().fetchProvidersForEmail(email).then(result => {
			if(result[0] != null)
			{
				console.log('Email Located');
			}
			else 
			{
				this.flash.show('User not registered.' , {cssClass: 'alert alert-danger', timeout: 5000});
			}
		});
	}


	checkConversation(uid)
	{
		let conversation: Conversation = null;
		conversation = this.afd.list('/')
	}
}

interface User{
	$displayName?:string;
	$email?:string;
	$isVerified?:string;
	$photoURL?:string;
}

interface Contact
{
	$uid?:string;
	$email?:string;
}

interface Conversation
{
	$id?:string;
	$participants?:User;
}