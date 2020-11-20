import { Component, OnInit, Inject, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sure-dialog',
  templateUrl: './sure-dialog.component.html',
  styleUrls: ['./sure-dialog.component.sass'],
})
export class SureDialogComponent implements OnInit {
  @Input('message')
  message: string = '';
  @Input('isNoButtonNeed')
  isNoButtonNeed: boolean;
  @Output('selectedValue')
  selectedValue = new EventEmitter<string>();
  loadModal:boolean;

  constructor() {
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges){
	  	if(this.message !== '') this.loadModal = true;	
  }
  
  yesClicked(){
  this.loadModal = false;
	this.selectedValue.emit('yes');
  }

  noClicked(){
  	this.loadModal = false;
  	this.selectedValue.emit('no');
  }
}
