import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  ICompany,
  ISearchCompanyDTO,
} from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company/company.service';

import { CompanyErrorNotificationService } from 'src/app/services/company/companyErrorNotification/company-error-notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-section',
  templateUrl: './company-section.component.html',
  styleUrls: ['./company-section.component.scss']
})
export class CompanySectionComponent implements OnInit {

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
  

  @ViewChild('razonSocialFilter') $razonSocialFilter!: ElementRef;

  constructor(
    private _companyService: CompanyService,
    private _companyErrorNotification: CompanyErrorNotificationService,
    private toastr: ToastrService
  ) { }

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

    const elements: HTMLElement[] = click.path;
    const row = elements.find(element => 
      element.className == "table__row-body" || element.className == "table__row-body ng-star-inserted"
    );

    if (row) {
      idCompanyClicked = row.childNodes[0].textContent;
    }

    return idCompanyClicked;
  }

  private getFilterParams(): ISearchCompanyDTO {

    const $razonSocialFilter = this.$razonSocialFilter.nativeElement;
    const paramRazonSocial = $razonSocialFilter.value;

    return paramRazonSocial;
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
    
    const $razonSocialFilter = this.$razonSocialFilter.nativeElement;
    $razonSocialFilter.value = '';
    
    this.getCompaniesSubscription = this.getCompanies();    
  }

}
