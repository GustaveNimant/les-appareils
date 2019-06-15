import { User } from '../models/User.model';
import { Subject } from 'rxjs/Subject';

export class UserService {

    private users: User[] = [
	{
	    firstName: 'William',
	    lastName: 'Jones',
	    email: 'william.jones@gmx.com',
	    drinkPreference: "jus d'orange",
	    hobbies : ['coder', 'boire du café']
	},
	{
	    firstName: 'Edgar',
	    lastName: 'Poe',
	    email: 'edgar@poe.fr',
	    drinkPreference: 'bourbon',
	    hobbies : []
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

    removeUser(user: User) {
	console.log('Entering in removeUser for ',user);
	const userIndexToRemove = this.users.findIndex(
	    (a_user) => user.isEqual (a_user) 
	);
	this.users.splice(userIndexToRemove, 1);
	//this.saveUsers();
	this.emitUsers();
    }
}
