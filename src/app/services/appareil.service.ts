import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Db } from '../models/Db.model';

@Injectable()

export class AppareilService {

    private appareils = [];

    constructor(private httpClient: HttpClient) { };

    appareilSubject = new Subject<any[]>();
    
    emitAppareilSubject() {
	this.appareilSubject.next(this.appareils.slice());
    }
    
    switchOnAll() {
	for(let appareil of this.appareils) {
	    appareil.status = 'allumé';
	}
	this.emitAppareilSubject();
    }

    switchOffAll() {
	for(let appareil of this.appareils) {
	    appareil.status = 'éteint';
	}
	this.emitAppareilSubject();
    }

    switchOnOne(i: number) {
	this.appareils[i].status = 'allumé';
	this.emitAppareilSubject();
    }

    switchOffOne(i: number) {
        this.appareils[i].status = 'éteint';
	this.emitAppareilSubject();
    }

    addAppareil(name: string, status: string) {
	const appareilObject = {
	    id: 0,
	    name: '',
	    status: ''
	};

	appareilObject.name = name;
	appareilObject.status = status;
	appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
	
	this.appareils.push(appareilObject);
	this.emitAppareilSubject();
    }
    
    getAppareilById(id: number) {
	const appareil = this.appareils.find(
	    (s) => {
		return s.id === id;
	    }
	);
	return appareil;
    }

    saveAppareilsToServer() {
	this.httpClient
	    .put('https://les-appareils.firebaseio.com/appareils.json', this.appareils)
	//    .put(db_url, this.appareils)
	    .subscribe(
		() => {
		    console.log('Enregistrement terminé !');
		},
		(error) => {
		    console.log('saveAppareilsToServer Erreur : ' + error);
		}
	    );
    }

    getAppareilsFromServer() {
	this.httpClient
	    .get<any[]>('https://les-appareils.firebaseio.com/appareils.json')
		.subscribe(
		    (response) => {
			this.appareils = response;
			this.emitAppareilSubject();
		    },
		    (error) => {
			console.log('Erreur ! : ' + error);
		    }
		);
    }
}
