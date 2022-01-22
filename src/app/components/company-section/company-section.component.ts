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
  responsivePagination = true;


  constructor(
    private _companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.getCompanies();
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

  public getCompanies():void{
    this._companyService.getListCompanies().subscribe( (data) => {
      this.companyList = data;

    }, error => {
      console.log(error);
    })
  };

  // insertCompanyEvent(company) -> se ejecuta cuando se dispara onSubmit del componente hijo [company-popup-add.components.ts]
  // consume el servicio insertCompany.
  insertCompanyEvent(company:Company){

    console.log(company);
    this._companyService.insertCompany( company ).subscribe((data) => {
      console.log(data);
    }, error => {
      console.log(error);
    });

    this.suscription = this._companyService.refresh$.subscribe(()=>{
      this.getCompanies();
    })
  }

}
