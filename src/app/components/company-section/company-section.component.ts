import { Component, Input, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-company-section',
  templateUrl: './company-section.component.html',
  styleUrls: ['./company-section.component.scss']
})
export class CompanySectionComponent implements OnInit {
  @ViewChild('popupAddEdit') popupAddEdit:any; 
  isOpen:boolean = false;
  isEdit:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  open_popup():void{
    this.isOpen = true;
    this.isEdit = false;
  }

  close_popup_parent(newValue:boolean){
    this.isOpen = newValue;
  }

  edit_popup():void {
    this.isOpen = true;
    this.isEdit = true;
  }



}
