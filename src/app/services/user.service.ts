import { User } from '../models/User.model';
import { Subject } from 'rxjs/Subject';

export class UserService {
    private users: User[] = [
	{
	    firstName: 'William',
	    lastName: 'Jones',
	    email: 'william.jones@gmx.com',
	    drinkPreference: 'jus d\'orange',
	    hobbies : ['coder', 'boire du café']
	}
    ];
    userSubject = new Subject<User[]>();

    emitUsers() {
	this.userSubject.next(this.users.slice());
    }

    addUser(user: User) {
	this.users.push(user);
	this.emitUsers();
    }
}
