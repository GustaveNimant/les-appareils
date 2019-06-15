import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit, OnDestroy {

    users: User[];
    userSubscription: Subscription;

    constructor(private userService: UserService) { }

    ngOnInit() {
	console.log ('Entering in ngOnInit');
	this.userSubscription = this.userService.userSubject.subscribe(
	    (user_a: User[]) => {
		this.users = user_a;
	    }
	);
	this.userService.emitUsers();
    }
    
    onDeleteUser(user: User) {
	this.userService.removeUser(user);
    }

    ngOnDestroy() {
	this.userSubscription.unsubscribe();
    }
}
