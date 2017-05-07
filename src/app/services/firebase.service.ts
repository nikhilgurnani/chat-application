import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Injectable()
export class FirebaseService {

	user:FirebaseObjectObservable<User>;
	users: FirebaseListObservable<User[]>;
	constructor(private af: AngularFireModule,
	            public afAuth: AngularFireAuth){

	}

	addUser(email, password)
	{
		this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch(err => {
			console.log("error aaya");
		});
	}
}

interface User{
	$email?:string;
	$password?:string;
}