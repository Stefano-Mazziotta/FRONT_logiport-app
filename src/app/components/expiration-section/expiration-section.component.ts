import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IBoatSelected } from 'src/app/interfaces/boat';
import { IcompanySelected } from 'src/app/interfaces/company';

import { IExpiration, IGetAllExpirationsDTO, ISearchExpirationDTO } from 'src/app/interfaces/expiration';
import { ExpirationService } from 'src/app/services/expiration/expiration.service';
import { ExpirationErrorNotificationService } from 'src/app/services/expiration/expiration-error-notification/expiration-error-notification.service';

@Component({
  selector: 'app-expiration-section',
  templateUrl: './expiration-section.component.html',
  styleUrls: ['./expiration-section.component.scss']
})
export class ExpirationSectionComponent implements OnInit, OnDestroy {

  constructor(
    private _expirationService: ExpirationService,
    private _expirationErrorNotification: ExpirationErrorNotificationService,
    formBuilder: FormBuilder
  ) {
    this.expirationFilterForm = formBuilder.group({
      title: ['', Validators.required]
    })
  }

  section: string = "expiration";

  expirationFilterForm: FormGroup;

  existCompanySelected: boolean = false;
  companySelected:IcompanySelected | null = null;

  existBoatSelected: boolean = false;
  boatSelected: IBoatSelected | null = null;

  isLoading: boolean = false;

  getExpirationsSubscription: Subscription | undefined;
  searchExpirationSubscription: Subscription | undefined;  

  expirationList: IExpiration[] = [];
  existExpirations: boolean = false;

  isUpdate: boolean = false;
  isOpenCreateUpdateModal: boolean = false;

  isOpenViewModal: boolean = false;
  isOpenConfirmDeleteModal: boolean = false;

  idExpirationClicked: string = "";

  currentPage: number = 1;
  totalItemsPage: number = 7;
  responsivePagination: boolean = true;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.getExpirationsSubscription?.unsubscribe();
    this.searchExpirationSubscription?.unsubscribe();
  }

  public companySelectedEvent(companySelected: IcompanySelected | null): void {
    this.existCompanySelected = companySelected != null;
    this.companySelected = companySelected;
  }

  public boatSelectedEvent(boatSelected: IBoatSelected | null): void {
    this.existBoatSelected = boatSelected != null;
    this.boatSelected = boatSelected;

    if (this.companySelected && this.boatSelected) {

      const params: IGetAllExpirationsDTO = {
        idCompany: this.companySelected.idCompany,
        idBoat: this.boatSelected.idBoat
      }
      this.getExpirationsSubscription = this.getExpirations(params);
    }
  }

  public openCreateModal(): void {
    this.isUpdate = false;
    this.isOpenCreateUpdateModal = true;
  }

  public openUpdateModal(click: MouseEvent): void {
    const idExpirationClicked = this.getIdExpirationClicked(click);
    
    if(idExpirationClicked){
      this.idExpirationClicked = idExpirationClicked;
      this.isUpdate = true;
      this.isOpenCreateUpdateModal = true;
    }
  }

  public openViewModal(click: MouseEvent): void {
    const idExpirationClicked = this.getIdExpirationClicked(click);
    
    if(idExpirationClicked){
      this.idExpirationClicked = idExpirationClicked;
      this.isOpenViewModal = true;
    }
  }

  public openDeleteConfirmModal(click: MouseEvent) {
    const idExpirationClicked = this.getIdExpirationClicked(click);

    if (idExpirationClicked) {
      this.idExpirationClicked = idExpirationClicked;
      this.isOpenConfirmDeleteModal = true;
    }
  }

  public closeModal(isSendRequest: boolean = false): void {

    if (this.companySelected && this.boatSelected) {

      const params: IGetAllExpirationsDTO = {
        idCompany: this.companySelected.idCompany,
        idBoat: this.boatSelected.idBoat
      }
      if (isSendRequest) this.getExpirationsSubscription = this.getExpirations(params);
    }

    this.isOpenCreateUpdateModal = false;
    this.isOpenViewModal = false;
    this.isOpenConfirmDeleteModal = false; 
  }

  public searchExpiration(): void {

    const filterParams = this.getFilterParams();

    if (filterParams) {
      this.isLoading = true;
      this.searchExpirationSubscription = this._expirationService.searchExpiration(filterParams).subscribe({
        next: response => {
          this.expirationList = response.data;
          this.existExpirations = this.expirationList.length > 0;
          this.isLoading = false;
        },
        error: error => {          
          const { status } = error;
          this.isLoading = false;
          this._expirationErrorNotification.search(status);
        }
      });
    }
  }

  public resetFilter(): void {
    this.expirationFilterForm.reset();

    const idCompanySelected = this.companySelected?.idCompany;
    const idBoatSelected = this.boatSelected?.idBoat;

    if(idCompanySelected && idBoatSelected){
      const params:IGetAllExpirationsDTO = {
        idCompany: idCompanySelected,
        idBoat: idBoatSelected
      }
      this.getExpirationsSubscription = this.getExpirations(params); 
    }
  }

  private getFilterParams(): ISearchExpirationDTO | null {

    let params: ISearchExpirationDTO | null = null;

    if (this.companySelected && this.boatSelected) {

      const idCompanySelected = this.companySelected.idCompany;
      const idBoatSelected = this.boatSelected.idBoat;

      const title = this.expirationFilterForm.get('title')?.value;

      params = {
        idCompany: idCompanySelected,
        idBoat: idBoatSelected,
        title: title
      }
    }

    return params;
  }

  private getIdExpirationClicked(click:any): string | null{
    let idExpirationClicked = null;

    const elements: HTMLElement[] = click.composedPath();
    const row = elements.find(element => 
      element.className == "table__row-body" || element.className == "table__row-body ng-star-inserted"
    );

    if (row) {
      idExpirationClicked = row.childNodes[0].textContent;
    }

    return idExpirationClicked;
  }

  private getExpirations(params: IGetAllExpirationsDTO):Subscription {
    this.isLoading = true;
    return this._expirationService.getAllExpirations(params).subscribe({
      next: response => {
        this.expirationList = response.data;
        this.existExpirations = this.expirationList.length > 0;

        this.isLoading = false;
      },
      error: error => {
        const { status } = error;

        this.isLoading = false;
        this.existExpirations = false;
        this._expirationErrorNotification.getAll(status);
      }
    })
  }

}
