import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.sass']
})
export class BaseComponent implements OnInit {

  constructor(public messageService: MessageService) { }

	ngOnInit(): void {}

	updateToastMessage(msg, severity, title){
    	this.messageService.add({severity:severity, summary:title, detail:msg});
  	}

  	logoutAfterTwoSeconds() {
  	 setTimeout(() => {
              //this.authService.logout();
          }, 2000)
  	};
}
