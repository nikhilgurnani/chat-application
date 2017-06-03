import { Component, OnInit } from '@angular/core';
import { UserPresenceService } from '../../services/user-presence.service';
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
		public flashMessagesService: FlashMessagesService)
	{}

	ngOnInit() {
	}

	loginWithGoogle()
	{
		this.userPresence.loginWithGoogle();
	}

	loginWithFacebook()
	{
	this.userPresence.loginWithFacebook();		
	}

	login()
	{
		this.userPresence.login(this.username, this.password);
	}
}