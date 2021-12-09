import { Component, Input, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Company } from 'src/app/interfaces/company';

@Component({
  selector: 'app-company-section',
  templateUrl: './company-section.component.html',
  styleUrls: ['./company-section.component.scss']
})
export class CompanySectionComponent implements OnInit {
  @ViewChild('popupAddEdit') popupAddEdit:any; 
  isOpen:boolean = false;
  isEdit:boolean = false;
  
  isOpenView:boolean = false;

  companyList:Company[] = [];
  
  // momentaneo ---
  companyExample = {
    id: 0,
    name: "Los pollos hermanos",
    cuit: 10101010,
  };
  companyExampleDos = {
    id: 1,
    name: "Bad bunny team",
    cuit: 102345668,
  };
  // momentaneo ---

  constructor() { }

  ngOnInit(): void {
    this.companyList.push(this.companyExample);
    this.companyList.push(this.companyExampleDos);
    
  }

  private getCompanies():void{
    
  };

  // add_popup() -> cambia el valor de los inputs-controlers.
  // Esto ejecuta el ciclo de vida ngOnChanges del child component (popup-add-edit)
  public add_popup():void{
    this.isOpen = true;
    this.isEdit = false;
  }

  // edit_popup() -> cambia el valor de los inputs-controlers.
  // Esto ejecuta el ciclo de vida ngOnChanges del child component (popup-add-edit)
  public edit_popup():void {
    this.isOpen = true;
    this.isEdit = true;
  }
  
  // close_popup_parent(boolean) -> reestablece el valor de isOpen a false.
  // Esto se ejecuta cuando el child component emite el nuevo valor de isOpen.
  // La función encargada de emitir el nuevo valor es close_popup() del child component (popup).
  public close_popup_parent(newValue:boolean){
    this.isOpen = newValue;
    this.isOpenView = newValue;
  }

  public view_popup():void{
    this.isOpenView = true;
  }
}
