import { Component, Input, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
    selector: 'app-appareil',
    templateUrl: './appareil.component.html',
    styleUrls: ['./appareil.component.scss']
})

export class AppareilComponent implements OnInit {

    @Input() appareilName: string;
    @Input() appareilStatus: string;
    @Input() index: number;
    @Input() id: number;

    constructor(private appareilService: AppareilService) { } /* injection */
    ngOnInit() {
    }

    getStatus() {
	return this.appareilStatus;
    }

    onAllumer () {
	console.log ('In onAllumer id ', this.id);
	this.appareilService.switchOnOne (this.id-1);
    }  
    
    onEteindre () {
	console.log ('In onEteindre id ', this.id);
	this.appareilService.switchOffOne (this.id-1);
    }
    
    getColor() {
	if(this.appareilStatus === 'allumé') {
	    return 'green';
	} else if(this.appareilStatus === 'éteint') {
	    return 'red';
	}
    }
}
