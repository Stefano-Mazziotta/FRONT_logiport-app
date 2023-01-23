import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BoatErrorNotificationService } from 'src/app/services/boat/boat-error-notification/boat-error-notification.service';
import { BoatService } from 'src/app/services/boat/boat.service';
import { IBoat, ISearchBoatDTO } from 'src/app/interfaces/boat';
import { IcompanySelected } from 'src/app/interfaces/company';

@Component({
  selector: 'app-boat-section',
  templateUrl: './boat-section.component.html',
  styleUrls: ['./boat-section.component.scss']
})
export class BoatSectionComponent implements OnInit {

  constructor(
    private _boatService: BoatService,
    private _boatErrorNotification: BoatErrorNotificationService,
    private fb: FormBuilder,
  ) {
    this.boatFilterForm = this.fb.group({
      boatNameFilter: ['', Validators.required]
    })
  }

  boat: IBoat = {
    IdBoat: '',
    IdCompany: 0,
    BoatName: '',
    Enrollment: '',
    DistinguishingMark: '',
    HullMaterial: '',
    BoatType: '',
    Service: '',
    SpecificExploitation: '',
    EnrollmentDate: 0,
    ConstructionDate: 0,
    NAT: 0,
    NAN: 0,
    Eslora: 0,
    Manga: 0,
    Puntal: 0,
    PeopleTransported: 0,
    BoatPower: '',
    ElectricPower: '',
    IsDeleted: null,
    TimeSave: null,
    TimeDeleted: null,
    TimeLastUpdate: null
  }

  section: string = "boat";
  companySelected: IcompanySelected | null = null;

  isOpenCreateUpdateModal: boolean = false;
  isUpdate: boolean = false;
  isOpenConfirmDeleteModal: boolean = false;
  isOpenViewModal: boolean = false;

  idBoatClicked: string = "";
  isLoading: boolean = false;

  boatList: IBoat[] = [];
  existBoats: boolean = false;

  currentPage: number = 1;
  totalItemsPage: number = 7;
  responsivePagination: boolean = true;

  boatFilterForm: FormGroup;

  getBoatsSubscription: Subscription | undefined;
  searchBoatSubscription: Subscription | undefined;

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.getBoatsSubscription?.unsubscribe();
    this.searchBoatSubscription?.unsubscribe();
  }

  private getBoats(idCompany: string): Subscription {
    this.isLoading = true;
    return this._boatService.getAllBoats(idCompany).subscribe({
      next: response => {
        this.isLoading = false;

        this.boatList = response.data;
        this.existBoats = this.boatList.length > 0;
      },
      error: error => {
        const { status } = error;
        this.isLoading = false;
        this.existBoats = false;
        this._boatErrorNotification.getAll(status);
      }
    })
  }

  private getIdBoatClicked(click:any):string | null{

    let idBoatClicked = null;

    const elements: HTMLElement[] = click.composedPath();
    const row = elements.find(element => 
      element.className == "table__row-body" || element.className == "table__row-body ng-star-inserted"
    );

    if (row) {
      idBoatClicked = row.childNodes[0].textContent;
    }

    return idBoatClicked;
  }

  private getFilterParams(): ISearchBoatDTO | null {

    let searchBoatParams: ISearchBoatDTO | null = null;

    if(this.companySelected){

      const idCompanySelected = this.companySelected.idCompany;
      const boatName = this.boatFilterForm.get('boatNameFilter')?.value;

      searchBoatParams = {
        idCompany: idCompanySelected,
        boatName: boatName
      }      
    }

    return searchBoatParams;
  }

  public companySelectedEvent(companySelected: IcompanySelected | null) {

    if (companySelected) {
      const { idCompany } = companySelected;
      this.getBoatsSubscription = this.getBoats(idCompany);
    }

    this.companySelected = companySelected;
  }

  public openCreateModal(): void {
    this.isUpdate = false;
    this.isOpenCreateUpdateModal = true;
  }

  public openUpdateModal(click: MouseEvent): void {
    const idBoatClicked = this.getIdBoatClicked(click);
    
    if(idBoatClicked){
      this.idBoatClicked = idBoatClicked;
      this.isUpdate = true;
      this.isOpenCreateUpdateModal = true;
    }
  }

  public openViewModal(click: MouseEvent): void {
    const idBoatClicked = this.getIdBoatClicked(click);
    
    if(idBoatClicked){
      this.idBoatClicked = idBoatClicked;
      this.isOpenViewModal = true;
    }
  }

  public openDeleteConfirmModal(click: MouseEvent) {
    const idBoatClicked = this.getIdBoatClicked(click);

    if (idBoatClicked) {
      this.idBoatClicked = idBoatClicked;
      this.isOpenConfirmDeleteModal = true;
    }
  }

  public closeModal(isSendRequest: boolean = false): void {

    if (this.companySelected) {

      const { idCompany } = this.companySelected;
      if (isSendRequest) this.getBoatsSubscription = this.getBoats(idCompany);

      this.isOpenCreateUpdateModal = false;
      this.isOpenViewModal = false;
      this.isOpenConfirmDeleteModal = false;
    }
  }

  public searchBoat(): void {
    const filterParams = this.getFilterParams();

    if (filterParams) {
      this.isLoading = true;
      this.searchBoatSubscription = this._boatService.searchBoat(filterParams).subscribe({
        next: response => {
          this.boatList = response.data;
          this.existBoats = this.boatList.length > 0;
          this.isLoading = false;
        },
        error: error => {          
          const { status } = error;
          this.isLoading = false;
          this.existBoats = false;
          this._boatErrorNotification.search(status);
        }
      });
    }
  }

  public resetFilter(): void {
    this.boatFilterForm.reset();

    const idCompanySelected = this.companySelected?.idCompany;
    if(idCompanySelected){
      this.getBoatsSubscription = this.getBoats(idCompanySelected); 
    }
  }

}
