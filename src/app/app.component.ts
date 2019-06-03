import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from './services/appareil.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
    title = 'Un titre';
    secondes: number;
    counterSubscription: Subscription;

    birthday = new Date(1988, 3, 15);
    toggle = true;
    
    get format()   { return this.toggle ? 'shortDate' : 'fullDate'; }

    toggleFormat() { this.toggle = !this.toggle; }
    
    ngOnInit() {
	const counter = Observable.interval(1000);
	this.counterSubscription = counter.subscribe(
	    (value:number) => {
		this.secondes = value;
	    },
	    (error:any) => {
		console.log('Uh-oh, an error occurred! : ', error);
	    },
	    () => {
		console.log('Observable complete!');
	    }
	);
    }

    ngOnDestroy() {
	this.counterSubscription.unsubscribe();
    }
}
