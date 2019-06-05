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
	this.userSubscription = this.userService.userSubject.subscribe(
	    (use_a: User[]) => {
		this.users = use_a;
	    }
	);
	this.userService.emitUsers();
    }

    ngOnDestroy() {
	this.userSubscription.unsubscribe();
    }
}
