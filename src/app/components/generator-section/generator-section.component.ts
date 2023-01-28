import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IBoatSelected } from 'src/app/interfaces/boat';
import { IcompanySelected } from 'src/app/interfaces/company';

import { IGenerator, IGetAllGeneratorsDTO, ISearchGeneratorDTO } from 'src/app/interfaces/generator';
import { GeneratorService } from 'src/app/services/generator/generator.service';
import { GeneratorErrorNotificationService } from 'src/app/services/generator/generator-error-notification/generator-error-notification.service';

@Component({
  selector: 'app-generator-section',
  templateUrl: './generator-section.component.html',
  styleUrls: ['./generator-section.component.scss']
})
export class GeneratorSectionComponent implements OnDestroy {
  
  constructor(
    private _generatorService: GeneratorService,
    private _generatorErrorNotification: GeneratorErrorNotificationService,
    private formBuilder: FormBuilder
  ){
    this.generatorFilterForm = formBuilder.group({
      numberGenerator: ['', Validators.required]
    })
  }

  section: string = "generator";

  generatorFilterForm: FormGroup;

  existCompanySelected: boolean = false;
  companySelected:IcompanySelected | null = null;

  existBoatSelected: boolean = false;
  boatSelected: IBoatSelected | null = null;

  isLoading: boolean = false;
  
  getGeneratorsSubscription: Subscription | undefined;
  searchGeneratorSubscription: Subscription | undefined;  

  generatorList: IGenerator[] = [];
  existGenerators: boolean = false;

  isUpdate: boolean = false;
  isOpenCreateUpdateModal: boolean = false;

  isOpenViewModal: boolean = false;
  isOpenConfirmDeleteModal: boolean = false;

  idGeneratorClicked: string = "";

  currentPage: number = 1;
  totalItemsPage: number = 7;
  responsivePagination: boolean = true;

  ngOnDestroy(): void {
    this.getGeneratorsSubscription?.unsubscribe();
    this.searchGeneratorSubscription?.unsubscribe();
  }

  public companySelectedEvent(companySelected: IcompanySelected | null): void {
    this.existCompanySelected = companySelected != null;
    this.companySelected = companySelected;
  }

  public boatSelectedEvent(boatSelected: IBoatSelected | null): void {
    this.existBoatSelected = boatSelected != null;
    this.boatSelected = boatSelected;

    if (this.companySelected && this.boatSelected) {

      const params: IGetAllGeneratorsDTO = {
        idCompany: this.companySelected.idCompany,
        idBoat: this.boatSelected.idBoat
      }
      this.getGeneratorsSubscription = this.getGenerators(params);
    }
  }

  public openCreateModal(): void {
    this.isUpdate = false;
    this.isOpenCreateUpdateModal = true;
  }

  public openUpdateModal(click: MouseEvent): void {
    const idGeneratorClicked = this.getIdGeneratorClicked(click);
    
    if(idGeneratorClicked){
      this.idGeneratorClicked = idGeneratorClicked;
      this.isUpdate = true;
      this.isOpenCreateUpdateModal = true;
    }
  }

  public openViewModal(click: MouseEvent): void {
    const idGeneratorClicked = this.getIdGeneratorClicked(click);
    
    if(idGeneratorClicked){
      this.idGeneratorClicked = idGeneratorClicked;
      this.isOpenViewModal = true;
    }
  }

  public openDeleteConfirmModal(click: MouseEvent) {
    const idGeneratorClicked = this.getIdGeneratorClicked(click);

    if (idGeneratorClicked) {
      this.idGeneratorClicked = idGeneratorClicked;
      this.isOpenConfirmDeleteModal = true;
    }
  }

  public closeModal(isSendRequest: boolean = false): void {

    if (this.companySelected && this.boatSelected) {

      const params: IGetAllGeneratorsDTO = {
        idCompany: this.companySelected.idCompany,
        idBoat: this.boatSelected.idBoat
      }
      if (isSendRequest) this.getGeneratorsSubscription = this.getGenerators(params);
    }

    this.isOpenCreateUpdateModal = false;
    this.isOpenViewModal = false;
    this.isOpenConfirmDeleteModal = false; 
  }

  public searchGenerator(): void {

    const filterParams = this.getFilterParams();

    if (filterParams) {
      this.isLoading = true;
      this.searchGeneratorSubscription = this._generatorService.searchGenerator(filterParams).subscribe({
        next: response => {
          this.generatorList = response.data;
          this.existGenerators = this.generatorList.length > 0;
          this.isLoading = false;
        },
        error: error => {          
          const { status } = error;
          this.isLoading = false;
          this._generatorErrorNotification.search(status);
        }
      });
    }
  }

  public resetFilter() {
    this.generatorFilterForm.reset();

    const idCompanySelected = this.companySelected?.idCompany;
    const idBoatSelected = this.boatSelected?.idBoat;

    if(idCompanySelected && idBoatSelected){
      const params:IGetAllGeneratorsDTO = {
        idCompany: idCompanySelected,
        idBoat: idBoatSelected
      }
      this.getGeneratorsSubscription = this.getGenerators(params); 
    }
  }

  private getFilterParams(): ISearchGeneratorDTO | null {

    let params: ISearchGeneratorDTO | null = null;

    if (this.companySelected && this.boatSelected) {

      const idCompanySelected = this.companySelected.idCompany;
      const idBoatSelected = this.boatSelected.idBoat;

      const numberGenearator = this.generatorFilterForm.get('numberGenerator')?.value;

      params = {
        idCompany: idCompanySelected,
        idBoat: idBoatSelected,
        numberGenerator: numberGenearator
      }
    }

    return params;
  }

  private getIdGeneratorClicked(click:any): string | null{
    let idGeneratorClicked = null;

    const elements: HTMLElement[] = click.composedPath();
    const row = elements.find(element => 
      element.className == "table__row-body" || element.className == "table__row-body ng-star-inserted"
    );

    if (row) {
      idGeneratorClicked = row.childNodes[0].textContent;
    }

    return idGeneratorClicked;
  }

  private getGenerators(params: IGetAllGeneratorsDTO){
    this.isLoading = true;
    return this._generatorService.getAllGenerators(params).subscribe({
      next: response => {
        this.generatorList = response.data;
        this.existGenerators = this.generatorList.length > 0;

        this.isLoading = false;
      },
      error: error => {
        const { status } = error;

        this.isLoading = false;
        this.existGenerators = false;
        this._generatorErrorNotification.getAll(status);
      }
    })
  }

}
