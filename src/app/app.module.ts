import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { environment } from 'environments/environment';
import { UserPresenceService } from './services/user-presence.service';
import { FirebaseService } from './services/firebase.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


const routes:Routes = [
	{path:'', component: HomeComponent},
	{path:'login', component: LoginComponent},
	{path:'logout', component: LogoutComponent},
	{path:'register-user', component: RegisterUserComponent},
	{path:':displayname', component: UserProfileComponent}
]

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		NavbarComponent,
		LoginComponent,
		RegisterUserComponent,
		LogoutComponent,
		UserProfileComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(routes),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		FlashMessagesModule
	],
	providers: [UserPresenceService, FirebaseService],
	bootstrap: [AppComponent]
})
export class AppModule { }
