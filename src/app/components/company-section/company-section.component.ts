import { Component, Input, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
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

  company:Company = {
    comID: undefined,
    comRazSoc: '',
    comCUIT: 0
  }

  inputSearchCompany!:string;

  constructor(
    private _companyService: CompanyService,
    private renderer: Renderer2
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
      this.company.comID = row.childNodes[0].innerHTML;
      this.company.comRazSoc = row.childNodes[1].innerHTML;
      this.company.comCUIT = row.childNodes[2].innerHTML;
    }
    //click en svg
    if(e.path[3].className == 'table__row-body'){
      row = e.path[3];
      this.company.comID = row.childNodes[0].innerHTML;
      this.company.comRazSoc = row.childNodes[1].innerHTML;
      this.company.comCUIT = row.childNodes[2].innerHTML;
    }
    // click en path
    if(e.path[4].className == 'table__row-body'){
      row = e.path[4];
      this.company.comID = row.childNodes[0].innerHTML;
      this.company.comRazSoc = row.childNodes[1].innerHTML;
      this.company.comCUIT = row.childNodes[2].innerHTML;
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

  public view_popup(e:any):void{
    let row;

    this.isOpenView = true;

    // click en btn
    if(e.path[2].className == 'table__row-body'){
      row = e.path[2];
      this.company.comID = row.childNodes[0].innerHTML;
      this.company.comRazSoc = row.childNodes[1].innerHTML;
      this.company.comCUIT = row.childNodes[2].innerHTML;
    }
    //click en svg
    if(e.path[3].className == 'table__row-body'){
      row = e.path[3];
      this.company.comID = row.childNodes[0].innerHTML;
      this.company.comRazSoc = row.childNodes[1].innerHTML;
      this.company.comCUIT = row.childNodes[2].innerHTML;
    }
    // click en path
    if(e.path[4].className == 'table__row-body'){
      row = e.path[4];
      this.company.comID = row.childNodes[0].innerHTML;
      this.company.comRazSoc = row.childNodes[1].innerHTML;
      this.company.comCUIT = row.childNodes[2].innerHTML;
    }

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

      company = {
        comID: this.company.comID,
        comRazSoc: company.comRazSoc,
        comCUIT: company.comCUIT
      }

      this._companyService.updateCompany( company ).subscribe({
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

  // search_company()
  // obtiene la razón social del input.
  // ejecuta la petición para realizar la busqueda de empresa y recarga el listCompany con el resultado.
  search_company(){

    if(this.inputSearchCompany != undefined){

      this._companyService.searchCompany(this.inputSearchCompany).subscribe({
        next: data => {
          console.log(data);
          this.companyList = data;
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }
}
