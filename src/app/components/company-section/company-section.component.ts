import { Component, Input, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { timestamp } from 'rxjs/operators';
import { Company } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company.service';

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

  suscription: Subscription | undefined;

  currentPage:number = 1;
  totalItemsPage:number = 7;
  responsivePagination:boolean = true;

  isOpenConfirmDelete:boolean = false;
  deleteCompanyID?:number = undefined;

  companyEdit = {
    ID: undefined,
    razonSocial: undefined,
    CUIT: undefined
  }

  constructor(
    private _companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.get_companies();
  }

  ngOnDestroy():void{
    this.suscription?.unsubscribe();
    console.log("observable cerrado")
  }

  // add_popup() -> cambia el valor de los inputs-controlers.
  // Esto ejecuta el ciclo de vida ngOnChanges del child component (popup-add-edit)
  public add_popup():void{
    this.isOpen = true;
    this.isEdit = false;
  }

  // edit_popup() -> cambia el valor de los inputs-controlers.
  // Esto ejecuta el ciclo de vida ngOnChanges del child component (popup-add-edit)
  public edit_popup(e:any):void {
    let row;
    this.isOpen = true;
    this.isEdit = true;

    // click en btn
    if(e.path[2].className == 'table__row-body'){
      row = e.path[2];
      this.companyEdit.ID = row.childNodes[0].innerHTML;
      this.companyEdit.razonSocial = row.childNodes[1].innerHTML;
      this.companyEdit.CUIT = row.childNodes[2].innerHTML;
    }
    //click en svg
    if(e.path[3].className == 'table__row-body'){
      row = e.path[3];
      this.companyEdit.ID = row.childNodes[0].innerHTML;
      this.companyEdit.razonSocial = row.childNodes[1].innerHTML;
      this.companyEdit.CUIT = row.childNodes[2].innerHTML;
    }
    // click en path
    if(e.path[4].className == 'table__row-body'){
      row = e.path[4];
      this.companyEdit.ID = row.childNodes[0].innerHTML;
      this.companyEdit.razonSocial = row.childNodes[1].innerHTML;
      this.companyEdit.CUIT = row.childNodes[2].innerHTML;
    }
  }

  // close_popup_parent(boolean) -> reestablece el valor de isOpen a false.
  // Esto se ejecuta cuando el child component emite el nuevo valor de isOpen.
  // La función encargada de emitir el nuevo valor es close_popup() del child component (popup).
  public close_popup_parent(closeValue:boolean){
    this.isOpen = closeValue;
    this.isOpenView = closeValue;
    this.isOpenConfirmDelete = closeValue;
  }

  public view_popup():void{
    this.isOpenView = true;
  }

  public get_companies():void{
    this._companyService.getListCompanies().subscribe( (data) => {
      this.companyList = data;

    }, error => {
      console.log(error);
    })
  };

  // insert_or_edit_company_event(company) -> se ejecuta cuando se dispara onSubmit del componente hijo [company-popup-add.components.ts]
  // Si isEdit = false -> consume el servicio insertCompany.
  // Si isEdit = true -> consume el servicio updateCompany.
  insert_or_edit_company_event(company:Company){

    if(this.isEdit  == false){

      this._companyService.insertCompany( company ).subscribe((data) => {
        console.log(data);
      }, error => {
        console.log(error);
      });
    }

    if(this.isEdit == true){

      this._companyService.updateCompany( company, this.companyEdit.ID ).subscribe({
        next: data => {
          console.log(data);
        },
        error: error => {
          console.log(error);
        }
      });
    }

    this.suscription = this._companyService.refresh$.subscribe(()=>{
      this.get_companies();
    })
  }

  // delete_confirm_company($event-click)
  // mediante el click obtiene el id del registro,
  // ejecuta el evento para abrir el popup para confirmación de eliminación.
  delete_confirm_company(e:any){
    let row;

    // click en btn
    if(e.path[2].className == "table__row-body"){
      row = e.path[2];
      this.deleteCompanyID = row.childNodes[0].innerHTML;
    }
    // click en svg
    if(e.path[3].className == "table__row-body"){
      row = e.path[3];
      this.deleteCompanyID = row.childNodes[0].innerHTML;
    }
    //click en path
    if(e.path[4].className == "table__row-body"){
      row = e.path[4];
      this.deleteCompanyID = row.childNodes[0].innerHTML;
    }

    this.isOpenConfirmDelete = true;
  }

  // delete_company(boolean)
  // si se confirma la eliminación envía petición de eliminación al back con el id del registro.
  delete_company(isDelete:boolean){
    if(isDelete == true){

      this._companyService.deleteCompany(this.deleteCompanyID).subscribe({
        next: data => {
          console.log(data);
        },
        error: error => {
          console.log(error);
        }
      });

      this.suscription = this._companyService.refresh$.subscribe(()=>{
        this.get_companies();
      })
    }
  }
}
