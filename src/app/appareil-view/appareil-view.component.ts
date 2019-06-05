import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-appareil-view',
    templateUrl: './appareil-view.component.html',
    styleUrls: ['./appareil-view.component.scss']
})

export class AppareilViewComponent implements OnInit, OnDestroy {

    appareils: any[];
    appareilSubscription: Subscription;

    lastUpdate = new Promise ((resolve, reject) => {
	const date = new Date();
	setTimeout(
	    () => {
		resolve(date);
	    }, 2000
	);
    });

    constructor(private appareilService: AppareilService) { } /* injection */

    ngOnInit() {
	this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
	    (app_: any[]) => {
		this.appareils = app_;
	    },
	    (error:any) => {
		console.log('Oh-oh il y a une erreur! : ', error);
	    },
	    () => {
		console.log('Les appareils ont été affichés!');
	    }
	);
	this.appareilService.emitAppareilSubject();
    }

    onAllumer() {
	this.appareilService.switchOnAll();
    }

    onEteindre() {
	if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
	    this.appareilService.switchOffAll();
	} else {
	    return null;
	}
    }

    onEnregistrer() {
	this.appareilService.saveAppareilsToServer();
    }

    onRecuperer() {
	this.appareilService.getAppareilsFromServer();
    }

    ngOnDestroy() {
	this.appareilSubscription.unsubscribe();
    }

}
