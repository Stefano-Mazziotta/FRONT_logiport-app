import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { CompanyService } from 'src/app/services/company/company.service';
import { CompanyErrorNotificationService } from 'src/app/services/company/company-error-notification/company-error-notification.service';
import { BoatService } from 'src/app/services/boat/boat.service';
import { BoatErrorNotificationService } from 'src/app/services/boat/boat-error-notification/boat-error-notification.service';

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
  deleteBoatSubscription: Subscription | undefined;

  constructor(
    private _companyService: CompanyService,
    private _companyErrorNotification: CompanyErrorNotificationService,
    private _boatService: BoatService,
    private _boatErrorNotification: BoatErrorNotificationService,
    private toastr: ToastrService,
  ) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.deleteCompanySubscription?.unsubscribe();
    this.deleteBoatSubscription?.unsubscribe();
  }

  public closeModal(isSendRequest:boolean = false) {

    if (this.clickModal == false && !this.isLoading) {
      this.closeModalEvent.emit(isSendRequest);
    }
    this.clickModal = false;
  }

  public delete(): void {
    if (this.section === "company") {
      this.deleteCompanySubscription = this.deleteCompany();
    }
    if(this.section === "boat"){
      this.deleteBoatSubscription = this.deleteBoat();
    }
  }

  private deleteCompany(): Subscription {
    this.isLoading = true;

    return this._companyService.deleteCompany(this.idEntityClicked).subscribe({
      next: response => {
        this.isLoading = false;
        this.closeModal(true);
        this.toastr.success("Empresa eliminada.", "Enhorabuena!");
      },
      error: error => {
        this.isLoading = false;
        this._companyErrorNotification.delete();
      }
    });
  }

  private deleteBoat(): Subscription {
    this.isLoading = true;

    return this._boatService.deleteBoat(this.idEntityClicked).subscribe({
      next: response => {
        this.isLoading = false;
        this.closeModal(true);
        this.toastr.success("Lancha eliminada.", "Enhorabuena!");
      },
      error: error => {
        this.isLoading = false;
        this._boatErrorNotification.delete();
      }
    });
  }
}


