import { User } from '../models/User.model';
import { Subject } from 'rxjs/Subject';

export class UserService {

    userSubject = new Subject<User[]>();

    private wj = new User ('William', 'Jones','william.jones@gmx.com', "jus d'orange",['coder', 'boire du café']);
    private ep = new User ('Edgar', 'Poe','edgar@poe.fr', 'bourbon',[]);
    private users = [this.wj, this.ep];
    
    emitUsers() {
	this.userSubject.next(this.users.slice());
    }

    addUser(user: User) {
	this.users.push(user);
	this.emitUsers();
    }

    areUserEqual(user: User, other: User){
	return other === user;
    }
    
    removeUser(user: User) {
	console.log('Entering in removeUser for ',user);
	const userIndexToRemove = this.users.findIndex(
	    (a_user) => {return user.isEqual (a_user)} 
	);
	this.users.splice(userIndexToRemove, 1);
	this.emitUsers();
    }
}
