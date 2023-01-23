import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IcompanySelected } from 'src/app/interfaces/company';
import { IBoatSelected } from 'src/app/interfaces/boat';

import { MotorService } from 'src/app/services/motor/motor.service';
import { MotorErrorNotificationService } from 'src/app/services/motor/motor-error-notification/motor-error-notification.service';
import { IGetAllMotorsDTO, ISearchMotorDTO, IMotor } from 'src/app/interfaces/motor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-motor-section',
  templateUrl: './motor-section.component.html',
  styleUrls: ['./motor-section.component.scss']
})
export class MotorSectionComponent implements OnInit {

  constructor(
    private _motorService: MotorService,
    private _motorErrorNotification: MotorErrorNotificationService,
    private formBuilder: FormBuilder
  ) {
    this.motorFormFilter = this.formBuilder.group({
      numberMotor: ['', Validators.required]
    })
  }

  section: string = "motor";

  motorFormFilter: FormGroup;

  companySelected: IcompanySelected | null = null;
  boatSelected: IBoatSelected | null = null;

  existCompanySelected: boolean = false;
  existBoatSelected: boolean = false;

  isOpenCreateUpdateModal: boolean = false;
  isOpenViewModal: boolean = false;
  isOpenConfirmDeleteModal: boolean = false;
  isUpdate: boolean = false;
  idMotorClicked: string = "";

  isLoading: boolean = false;

  getMotorsSubscription: Subscription | undefined;
  searchMotorSubscription: Subscription | undefined;

  motorList: IMotor[] = [];
  existMotors: boolean = false;

  currentPage: number = 1;
  totalItemsPage: number = 7;
  responsivePagination: boolean = true;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.getMotorsSubscription?.unsubscribe();
    this.searchMotorSubscription?.unsubscribe();
  }

  public companySelectedEvent(companySelected: IcompanySelected | null): void {
    this.existCompanySelected = companySelected != null;
    this.companySelected = companySelected;
  }

  public boatSelectedEvent(boatSelected: IBoatSelected | null): void {
    this.existBoatSelected = boatSelected != null;
    this.boatSelected = boatSelected;

    if (this.companySelected && this.boatSelected) {

      const params: IGetAllMotorsDTO = {
        idCompany: this.companySelected.idCompany,
        idBoat: this.boatSelected.idBoat
      }
      this.getMotorsSubscription = this.getMotors(params);

    }
  }

  public openCreateModal(): void {
    this.isUpdate = false;
    this.isOpenCreateUpdateModal = true;
  }

  public openUpdateModal(click: MouseEvent): void {
    const idMotorClicked = this.getIdMotorClicked(click);
    
    if(idMotorClicked){
      this.idMotorClicked = idMotorClicked;
      this.isUpdate = true;
      this.isOpenCreateUpdateModal = true;
    }
  }

  public openViewModal(click: MouseEvent): void {
    const idMotorClicked = this.getIdMotorClicked(click);
    
    if(idMotorClicked){
      this.idMotorClicked = idMotorClicked;
      this.isOpenViewModal = true;
    }
  }

  public openDeleteConfirmModal(click: MouseEvent) {
    const idMotorClicked = this.getIdMotorClicked(click);

    if (idMotorClicked) {
      this.idMotorClicked = idMotorClicked;
      this.isOpenConfirmDeleteModal = true;
    }
  }

  public closeModal(isSendRequest: boolean): void {

    if (this.companySelected && this.boatSelected) {

      const params: IGetAllMotorsDTO = {
        idCompany: this.companySelected.idCompany,
        idBoat: this.boatSelected.idBoat
      }
      if (isSendRequest) this.getMotorsSubscription = this.getMotors(params);
    }

    this.isOpenCreateUpdateModal = false;
    this.isOpenViewModal = false;
    this.isOpenConfirmDeleteModal = false; 
  }

  public searchMotor() {

    const filterParams = this.getFilterParams();

    if (filterParams) {
      this.isLoading = true;
      this.searchMotorSubscription = this._motorService.searchMotor(filterParams).subscribe({
        next: response => {
          this.motorList = response.data;
          this.existMotors = this.motorList.length > 0;
          this.isLoading = false;
        },
        error: error => {          
          const { status } = error;
          this.isLoading = false;
          this.existMotors = false;
          this._motorErrorNotification.search(status);
        }
      });
    }
  }

  public resetFilter() {
    this.motorFormFilter.reset();

    const idCompanySelected = this.companySelected?.idCompany;
    const idBoatSelected = this.boatSelected?.idBoat;

    if(idCompanySelected && idBoatSelected){
      const params:IGetAllMotorsDTO = {
        idCompany: idCompanySelected,
        idBoat: idBoatSelected
      }
      this.getMotorsSubscription = this.getMotors(params); 
    }
  }

  private getIdMotorClicked(click:any): string | null{
    let idMotorClicked = null;

    const elements: HTMLElement[] = click.composedPath();
    const row = elements.find(element => 
      element.className == "table__row-body" || element.className == "table__row-body ng-star-inserted"
    );

    if (row) {
      idMotorClicked = row.childNodes[0].textContent;
    }

    return idMotorClicked;
  }

  private getFilterParams(): ISearchMotorDTO | null {

    let searchMotorParams: ISearchMotorDTO | null = null;

    if (this.companySelected && this.boatSelected) {

      const idCompanySelected = this.companySelected.idCompany;
      const idBoatSelected = this.boatSelected.idBoat;

      const numberMotor = this.motorFormFilter.get('numberMotor')?.value;

      searchMotorParams = {
        idCompany: idCompanySelected,
        idBoat: idBoatSelected,
        numberMotor: numberMotor
      }
    }

    return searchMotorParams;
  }

  private getMotors(params: IGetAllMotorsDTO): Subscription {
    this.isLoading = true;

    return this._motorService.getAllMotors(params).subscribe({
      next: response => {
        this.motorList = response.data;
        this.existMotors = this.motorList.length > 0;
        console.log(this.motorList);

        this.isLoading = false;
      },
      error: error => {
        const { status } = error;

        this.isLoading = false;
        this.existMotors = false;
        this._motorErrorNotification.getAll(status);
      }
    })
  }

}
