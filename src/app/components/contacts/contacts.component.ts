import { Component, OnInit } from '@angular/core';
import { UserPresenceService } from '../../services/user-presence.service';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

	contactEmail: any;

	user: any;

	contacts: any;
	constructor(private userPresence: UserPresenceService,
	            private firebaseService: FirebaseService) {
	}

	ngOnInit()
	{
		this.firebaseService.getContactsForUser().subscribe(contacts => {
			this.contacts = contacts;
			console.log(contacts);
		});
	}

	addNewContact()
	{
		this.firebaseService.addContact(this.contactEmail);
	}
}
