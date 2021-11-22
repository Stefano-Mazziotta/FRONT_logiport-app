import { Component, Input, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-company-section',
  templateUrl: './company-section.component.html',
  styleUrls: ['./company-section.component.scss']
})
export class CompanySectionComponent implements OnInit {
  @ViewChild('popupAddEdit') popupAddEdit:any; 

  constructor() { }

  ngOnInit(): void {
  }

  trigger_popup_add(){
    this.popupAddEdit.open_popup_add();
  }
  trigger_popup_edit(){
    this.popupAddEdit.open_popup_edit();
  }
}
