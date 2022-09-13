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

  @ViewChild('popupAddEdit') popupAddEdit: any;
  isOpen: boolean = false;
  isEdit: boolean = false;

  isOpenView: boolean = false;
  // isOpenPopupAddEdit: boolean = false;
  companyList: ICompany[] = [];

  getCompaniesSubscription: Subscription | undefined;
  getCompanyByIdSubscription: Subscription | undefined;
  createCompanySubscription: Subscription | undefined;
  updateCompanySubscription: Subscription | undefined;
  deleteCompanySubscription: Subscription | undefined;
  searchCompanySubscription: Subscription | undefined;

  currentPage: number = 1;
  totalItemsPage: number = 7;
  responsivePagination: boolean = true;

  isOpenCreateUpdateModal: boolean = false;
  isOpenConfirmDelete: boolean = false;
  idCompanyDelete: string | null = null;

  company:ICompany = {
    IdCompany: "",
    RazonSocial: "",
    CUIT: 0,
    IsDeleted: 0,
    TimeDeleted: 0,
    TimeLastUpdate: 0,
    TimeSave: 0
  };

  isLoading:boolean = false;
  existCompanies: boolean = false;

  idCompanyClicked: string = "";

 

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
    this.getCompanyByIdSubscription?.unsubscribe();
    this.deleteCompanySubscription?.unsubscribe();
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
  };

  private getCompanyById(idCompany: string): Subscription {
    // quitarlo de aqui
    this.isLoading = true;
    return this._companyService.getCompanyById(idCompany).subscribe({
      next: response => {
        this.company = { ...response.data };
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
        this._companyErrorNotification.getById();
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
    this. isOpenCreateUpdateModal = true;
    this.isEdit = false;
  }

  public openUpdateModal(click: MouseEvent): void {

    const idCompanyClicked = this.getIdCompanyClicked(click);

    if (idCompanyClicked) {
      this.idCompanyClicked = idCompanyClicked;
      this.isEdit = true;
      this.isOpenCreateUpdateModal = true;
    }

  }

  public openViewModal(click: MouseEvent): void {

    const idCompanyClicked = this.getIdCompanyClicked(click);

    if (idCompanyClicked) {
      this.getCompanyByIdSubscription = this.getCompanyById(idCompanyClicked);
      this.isOpenView = true;
    }

  }

  public closeModal(isSendRequest: boolean = false): void {
    
    if (isSendRequest) this.getCompaniesSubscription = this.getCompanies();    
    this. isOpenCreateUpdateModal = false;
    this.isOpenView = false;
    this.isOpenConfirmDelete = false; 
  }

  public deleteConfirm(click: MouseEvent): void {

    const idCompanyClicked = this.getIdCompanyClicked(click);

    if (idCompanyClicked) {
      this.idCompanyDelete = idCompanyClicked;
      this.isOpenConfirmDelete = true;
      return;
    }

    this.isOpenConfirmDelete = false;
  }

  public deleteCompany(isDelete: boolean): void {
    if (isDelete == true && this.idCompanyDelete) {
      this.isLoading = true;
      this.deleteCompanySubscription = this._companyService.deleteCompany(this.idCompanyDelete).subscribe({
        next: response => {
          this.getCompaniesSubscription = this.getCompanies();          
          this.toastr.success("Empresa eliminada.","Enhorabuena!")
          this.isLoading = false;
        },
        error: error => {
          this.isLoading = false;
          this._companyErrorNotification.delete();
        }
      });
    }
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
