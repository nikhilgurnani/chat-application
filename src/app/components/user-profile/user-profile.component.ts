import { Component, OnInit } from '@angular/core';
import { UserPresenceService } from '../../services/user-presence.service';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Routes } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


	user: any;
  constructor(private up: UserPresenceService,
		private firebaseService:FirebaseService,
		private router: Router) { 
	  	if(this.up.afAuth.auth)
		{
			this.firebaseService.getUserDetails().subscribe(user => {
				this.user = user;
			});
		}
		else
		{
			this.router.navigate(['/login']);
		}
	}

  ngOnInit() {
  }

}
