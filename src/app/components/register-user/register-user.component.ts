import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { UserPresenceService } from '../../services/user-presence.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

	email:any;
	password:any;
	name:any;
	phone:any;
	constructor(private firebaseService:FirebaseService,
	            private router:Router,
	            private userPresence: UserPresenceService) { }

	onRegisterClick() {
		let user ={
			name: this.name,
			email: this.email,
			phone: this.phone
		}
		this.firebaseService.addUser(this.email, this.password, user);
		this.router.navigate(['']);
	}

	ngOnInit()
	{

	}

}
