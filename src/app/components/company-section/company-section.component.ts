import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ICompany, ISearchCompanyDTO } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company/company.service';
import { CompanyErrorNotificationService } from 'src/app/services/company/company-error-notification/company-error-notification.service';

@Component({
  selector: 'app-company-section',
  templateUrl: './company-section.component.html',
  styleUrls: ['./company-section.component.scss']
})
export class CompanySectionComponent implements OnInit, OnDestroy {

  section:string = "company";
  
  getCompaniesSubscription: Subscription | undefined;  
  searchCompanySubscription: Subscription | undefined;
 
  companyList: ICompany[] = [];
  
  currentPage: number = 1;
  totalItemsPage: number = 7;
  responsivePagination: boolean = true;

  isOpenCreateUpdateModal: boolean = false;
  isUpdate: boolean = false;

  isOpenConfirmDeleteModal: boolean = false;
  isOpenViewModal: boolean = false;

  idCompanyClicked: string = ""; 
  isLoading:boolean = false;

  company:ICompany = {
    IdCompany: "",
    RazonSocial: "",
    CUIT: 0,
    IsDeleted: 0,
    TimeDeleted: 0,
    TimeLastUpdate: 0,
    TimeSave: 0
  };
  
  existCompanies: boolean = false;

  companyFilterForm:FormGroup;

  constructor(
    private _companyService: CompanyService,
    private _companyErrorNotification: CompanyErrorNotificationService,
    private formBuilder: FormBuilder
  ) {

    this.companyFilterForm = this.formBuilder.group({
      razonSocial: ['', Validators.required]
    })
    
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  ngOnDestroy(): void {
    this.getCompaniesSubscription?.unsubscribe();
    this.searchCompanySubscription?.unsubscribe();
  }

  private getCompanies(): Subscription {
    this.isLoading = true;
    return this._companyService.getAllCompanies().subscribe({
      next: response => {
        this.isLoading = false;
        this.companyList = response.data;
        this.existCompanies = this.companyList.length > 0;
      },
      error: error => {
        const { status } = error;
        this.isLoading = false;
        this.existCompanies = false;
        this._companyErrorNotification.getAll(status);
      }
    });
  }

  private getIdCompanyClicked(click: MouseEvent | any): string | null {
    let idCompanyClicked = null;

    const elements: HTMLElement[] = click.composedPath();
    const row = elements.find(element => 
      element.className == "table__row-body" || element.className == "table__row-body ng-star-inserted"
    );

    if (row) {
      idCompanyClicked = row.childNodes[0].textContent;
    }

    return idCompanyClicked;
  }

  private getFilterParams(): ISearchCompanyDTO | null {
    
    let params: ISearchCompanyDTO | null = null;
    const razonSocial = this.companyFilterForm.get('razonSocial')?.value;

    if(razonSocial){
      params = {
        razonSocial
      }
    }
    return params;
  }

  public openCreateModal(): void {
    this.isOpenCreateUpdateModal = true;
    this.isUpdate = false;
  }

  public openUpdateModal(click: MouseEvent): void {

    const idCompanyClicked = this.getIdCompanyClicked(click);

    if (idCompanyClicked) {
      this.idCompanyClicked = idCompanyClicked;
      this.isUpdate = true;
      this.isOpenCreateUpdateModal = true;
    }

  }

  public openViewModal(click: MouseEvent): void {

    const idCompanyClicked = this.getIdCompanyClicked(click);

    if (idCompanyClicked) {
      this.idCompanyClicked = idCompanyClicked;
      this.isOpenViewModal = true;
    }

  }

  public openDeleteConfirmModal(click: MouseEvent): void {

    const idCompanyClicked = this.getIdCompanyClicked(click);

    if (idCompanyClicked) {
      this.idCompanyClicked = idCompanyClicked;
      this.isOpenConfirmDeleteModal = true;
    }
    
  }

  public closeModal(isSendRequest: boolean = false): void {
    
    if (isSendRequest) this.getCompaniesSubscription = this.getCompanies();    
    this. isOpenCreateUpdateModal = false;
    this.isOpenViewModal = false;
    this.isOpenConfirmDeleteModal = false; 
  } 

  public searchCompany(): void {

    const filterParams = this.getFilterParams();

    if (filterParams) {
      this.isLoading = true;
      this.searchCompanySubscription = this._companyService.searchCompany(filterParams).subscribe({
        next: response => {
          this.companyList = response.data;
          this.existCompanies = this.companyList.length > 0;
          this.isLoading = false;
        },
        error: error => {          
          const { status } = error;
          this.isLoading = false;
          this.existCompanies = false;
          this._companyErrorNotification.search(status);
        }
      });
    }
  }

  public resetFilter(): void {
    
    this.companyFilterForm.reset();    
    this.getCompaniesSubscription = this.getCompanies();    
  }

}
