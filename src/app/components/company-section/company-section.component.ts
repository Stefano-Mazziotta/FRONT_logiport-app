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

  // add_popup() -> cambia el valor de los inputs-controlers.
  // Esto ejecuta el ciclo de vida ngOnChanges del child component (popup-add-edit)
  add_popup():void{
    this.isOpen = true;
    this.isEdit = false;
  }

  // edit_popup() -> cambia el valor de los inputs-controlers.
  // Esto ejecuta el ciclo de vida ngOnChanges del child component (popup-add-edit)
  edit_popup():void {
    this.isOpen = true;
    this.isEdit = true;
  }
  
  // close_popup_parent(boolean) -> reestablece el valor de isOpen a false.
  // Esto se ejecuta cuando el child component emite el nuevo valor de isOpen.
  // La función encargada de emitir el nuevo valor es close_popup() del child component (popup).
  close_popup_parent(newValue:boolean){
    this.isOpen = newValue;
  }



}
