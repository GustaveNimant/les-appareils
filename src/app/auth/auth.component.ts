import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

    authStatus: boolean;

    constructor(private authService: AuthService, private router : Router) { }

    ngOnInit() {
	this.authStatus = this.authService.isAuth;
    }

    onSignIn() {
	this.authService.signIn().then(
	    () => {
		console.log('Connexion effectuée avec succès!');
		this.authStatus = this.authService.isAuth;
		this.router.navigate(['appareils']);
	    }
	);
    }

    onSignOut() {
	console.log('Déconnexion effectuée avec succès!');
	this.authService.signOut();
	this.authStatus = this.authService.isAuth;
    }

}
