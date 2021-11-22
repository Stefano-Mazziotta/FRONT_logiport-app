import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-company-section',
  templateUrl: './company-section.component.html',
  styleUrls: ['./company-section.component.scss']
})
export class CompanySectionComponent implements OnInit {
  @ViewChild('popupADD') popupAdd:any;

  constructor() { }

  ngOnInit(): void {
  }

  trigger_popup(){
    this.popupAdd.open_popup();
  }
}
