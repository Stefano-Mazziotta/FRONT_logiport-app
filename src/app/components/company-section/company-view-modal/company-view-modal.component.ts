import { Component, OnDestroy, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { CompanyService } from 'src/app/services/company/company.service';
import { CompanyErrorNotificationService } from 'src/app/services/company/company-error-notification/company-error-notification.service';
import { ICompany } from 'src/app/interfaces/company';

@Component({
  selector: 'app-company-view-modal',
  templateUrl: './company-view-modal.component.html',
  styleUrls: ['./company-view-modal.component.scss']
})
export class CompanyViewModalComponent implements OnInit, OnDestroy {

  @Input() isOpenModalView!: boolean;
  @Input() idCompanyClicked!: string;

  @Output() closeModalEvent = new EventEmitter<void>();

  isLoading: boolean = false;
  clickPopup: boolean = false;

  company: ICompany = {
    IdCompany: "",
    RazonSocial: "",
    CUIT: 0,
    IsDeleted: 0,
    TimeDeleted: 0,
    TimeLastUpdate: 0,
    TimeSave: 0
  };

  getCompanyByIdSubscription:Subscription | undefined;

  constructor(
    private _companyService: CompanyService,
    private _companyErrorNotification: CompanyErrorNotificationService
  ) { }

  ngOnInit(): void {
    this.getCompanyByIdSubscription = this.getCompanyById(this.idCompanyClicked);
  }
  
  ngOnDestroy():void{
    this.getCompanyByIdSubscription?.unsubscribe();
  }

  public closeModal() {

    if (this.clickPopup == false && !this.isLoading) {
      this.closeModalEvent.emit();
    }
    this.clickPopup = false;
  }

  private getCompanyById(idCompany: string): Subscription {
    this.isLoading = true;
    return this._companyService.getCompanyById(idCompany).subscribe({
      next: response => {
        this.company = response.data;
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
        this.closeModal();
        this._companyErrorNotification.getById();
      }
    });
  }

}
