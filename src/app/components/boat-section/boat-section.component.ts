import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/interfaces/company';
import { Router } from '@angular/router';
import { Boat } from 'src/app/interfaces/boat';
import { BoatService } from 'src/app/services/boat.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-boat-section',
  templateUrl: './boat-section.component.html',
  styleUrls: ['./boat-section.component.scss']
})
export class BoatSectionComponent implements OnInit {

  isOpen: boolean = false;
  isEdit: boolean = false;
  isOpenView:boolean = false;

  boat:Boat = {
    IdBoat: null,
    IdCompany: null,
    BoatName: null,
    Enrollment: null,
    DistinguishingMark: null,
    HullMaterial: null,
    BoatType: null,
    Service: null,
    SpecificExploitation: null,
    EnrollmentDate: null,
    ConstructionDate: null,
    NAT: null,
    NAN: null,
    Eslora: null,
    Manga: null,
    Puntal: null,
    PeopleTransported: null,
    BoatPower: null,
    ElectricPower: null,
    IsDeleted: null,
    TimeSave: null,
    TimeDeleted: null,
    TimeLastUpdate: null
  }
  boatList: Boat[] = [];
  existBoats: boolean = false;

  isOpenConfirmDelete:boolean = false;
  deleteBoatID:string | null | undefined = null;

  currentPage:number = 1;
  totalItemsPage:number = 7;
  responsivePagination:boolean = true;

  suscription: Subscription | undefined;

  boatFilterForm: FormGroup;

  constructor(
    private _router: Router,
    private _boatService: BoatService,
    private fb: FormBuilder,
  ) {
    this.boatFilterForm = this.fb.group({
      boatNameFilter: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.companySelected === null) {
      this._router.navigateByUrl('/seleccionar-empresa');
    }
    
    this.get_boats();
  }

  private get companySelected(): Company | null {
    let company = localStorage.getItem("companySelected");
    if (company != null && company != "") {
      return JSON.parse(company);
    }
    return null;
  }

  // add_popup() ===> change value of inputs-controlers.
  // execute cycle life ngOnChanges of child component (popup-add-edit)
  public add_popup(): void {
    this.isOpen = true;
    this.isEdit = false;
  }
  
  // close_popup_parent(boolean) ===> reset "isOpen" to false.
  // Is executed when close_popup() from child component emits the new value of "isOpen".
  public close_popup_parent(closeValue: boolean) {
    this.isOpen = closeValue;
    this.isOpenView = closeValue;
    this.isOpenConfirmDelete = closeValue;
  } 

  public view_popup(event:any):void{

    let elements:HTMLElement[] = event.path;    
    let row = elements.find(element => element.className == "table__row-body");
    let IdBoatClicked = row?.childNodes[0].textContent;
    
    if(IdBoatClicked){
      this.boat.IdBoat = parseInt(IdBoatClicked);
    }

    if(IdBoatClicked != null){
      this._boatService.getBoatById(parseInt(IdBoatClicked)).subscribe({
        next: data => {
          this.boat = data;
          this.isOpenView = true;
        },
        error: err => {
          console.log('error!!! ' + err );
        }
      });      
    }

  }

  // edit_popup() ===> change value of @inputs
  // execute life cycle ngOnChanges of child component (popup-add-edit)
  public edit_popup(event:any):void {
      
    let elements:HTMLElement[] = event.path;    
    let row = elements.find(element => element.className == "table__row-body");
    let IdBoatClicked = row?.childNodes[0].textContent;
    
    if(IdBoatClicked){
      this.boat.IdBoat = parseInt(IdBoatClicked);
    }

    if(IdBoatClicked != null){
      this._boatService.getBoatById(parseInt(IdBoatClicked)).subscribe({
        next: data => {
          this.boat = data;
          this.isEdit = true;
          this.isOpen = true;
        },
        error: err => {
          console.log('error!!! ' + err );
        }
      });      
    }
  }

  // delete_confirm_boat($event-click)
  // get id boat and then execute an event for open confirm delete popup.
  public delete_confirm_boat(event:any){

    let elements:HTMLElement[] = event.path;    
    let row = elements.find(element => element.className == "table__row-body");
    this.deleteBoatID = row?.childNodes[0].textContent;

    this.isOpenConfirmDelete = true;
  }

  public delete_boat(isDelete:boolean):void{
    if(isDelete == true && this.deleteBoatID){

      this._boatService.deleteBoat(parseInt(this.deleteBoatID)).subscribe({
        next: data => {
          console.log(data);
        },
        error: error => {
          console.log(error);
        }
      });

      this.suscription = this._boatService.refresh$.subscribe(()=>{
        this.get_boats();
      });

    }
  }
  
  // insert_or_edit_boat_event => execute when run "onSubmit" from child component [boat-popup-add.components.ts]  
  // if isEdit = false ==> consume insertBoat service.
  // if isEdit = true ==> consume updateBoat service.
  insert_or_edit_boat_event(boat: Boat) {
    console.log(boat);
    if (this.isEdit == false) {

      this._boatService.insertBoat(boat).subscribe({
        next: data => {
          console.log(data);
        },
        error: error => {
          console.log(error);
        }
      });
    }

    if(this.isEdit == true){
      this._boatService.updateBoat(boat).subscribe({
        next: data => {
          console.log(data);
        },
        error: error => {
          console.log(error);
        }
      });
    }

    this.suscription = this._boatService.refresh$.subscribe(() => {
      this.get_boats();
    });

  }

  private get_boats():void{

    if (this.companySelected?.IdCompany != null) {
      this._boatService.getListBoats(this.companySelected.IdCompany).subscribe({
        next: data => {
          this.boatList = data;
          this.existBoats = this.boatList.length > 0;
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }

  public searchBoat():void{

    if (this.companySelected?.IdCompany != null) {
      let idCompanySelected:number = this.companySelected.IdCompany;
      let boatName = this.boatFilterForm.get('boatNameFilter')?.value;

      if(boatName){
        this._boatService.searchBoat(boatName,idCompanySelected).subscribe({
          next: data => {
            this.boatList = data;
            this.existBoats = this.boatList.length > 0;
          },
          error: error => {
            console.log(error);
          }
        })
      }
    }    
  }

  public resetFilter():void{
    this.get_boats();
    this.boatFilterForm.reset();
  }

}
