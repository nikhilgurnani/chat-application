import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserPresenceService } from '../../services/user-presence.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private userPresence: UserPresenceService,
              private route: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  			if(this.userPresence.user)
  			{
		  		this.userPresence.logout();
		  		this.flashMessage.show('You have been successfully signed out.', {cssClass:'alert-success', timeout:5000});
		    	}
		    	else
		    	{
		    		this.route.navigate(['']);	
		    	}
    	}

}
