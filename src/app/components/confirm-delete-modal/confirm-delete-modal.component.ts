import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { CompanyService } from 'src/app/services/company/company.service';
import { CompanyErrorNotificationService } from 'src/app/services/company/companyErrorNotification/company-error-notification.service';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent implements OnInit {

  @Input() section!: string;
  @Input() idEntityClicked!: string;

  @Output() closeModalEvent = new EventEmitter<boolean>();

  clickModal: boolean = false;

  isLoading: boolean = false;
  deleteCompanySubscription: Subscription | undefined;

  constructor(
    private _companyService: CompanyService,
    private toastr: ToastrService,
    private _companyErrorNotification: CompanyErrorNotificationService,
  ) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.deleteCompanySubscription?.unsubscribe();
  }

  public closeModal() {

    if (this.clickModal == false && !this.isLoading) {
      this.closeModalEvent.emit();
    }
    this.clickModal = false;
  }

  public delete(): void {
    if (this.section === "company") {
      this.deleteCompanySubscription = this.deleteCompany();
    }
  }

  private deleteCompany(): Subscription {
    this.isLoading = true;

    return this._companyService.deleteCompany(this.idEntityClicked).subscribe({
      next: response => {
        this.isLoading = false;
        this.closeModal();
        this.toastr.success("Empresa eliminada.", "Enhorabuena!")
      },
      error: error => {
        this.isLoading = false;
        this._companyErrorNotification.delete();
      }
    });
  }



}


