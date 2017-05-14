import { Component, OnInit } from '@angular/core';
import { UserPresenceService } from '../../services/user-presence.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	user:any;
	constructor(private userPresence:UserPresenceService,
	            private flashMessage:FlashMessagesService){
		if(this.userPresence.afAuth.auth)
		{
			this.user = this.userPresence.afAuth.auth;
			console.log(this.user);
		}
	}

	ngOnInit(){
	}

	logout()
	{
		this.userPresence.logout();
		this.flashMessage.show('You have been successfully signed out.', {cssClass:'alert-success', timeout:5000});
	}
}
