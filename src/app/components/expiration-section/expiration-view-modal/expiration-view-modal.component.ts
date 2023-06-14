import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { IExpiration } from 'src/app/interfaces/expiration';
import { ExpirationErrorNotificationService } from 'src/app/services/expiration/expiration-error-notification/expiration-error-notification.service';
import { ExpirationService } from 'src/app/services/expiration/expiration.service';

@Component({
  selector: 'app-expiration-view-modal',
  templateUrl: './expiration-view-modal.component.html',
  styleUrls: ['./expiration-view-modal.component.scss']
})
export class ExpirationViewModalComponent implements OnInit, OnDestroy {

  constructor(
    private _expirationService: ExpirationService,
    private _expirationErrorNotificaction: ExpirationErrorNotificationService
  ) { }

  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Input() idExpirationClicked: string | null = null;

  clickModal: boolean = false;
  isLoading: boolean = false;

  expiration: IExpiration = {
    IdExpiration: '',
    IdBoat: '',
    Title: '',
    InitDate: 0,
    Description: '',
    ExpirationDate: 0,
    InspectorCheck: 0,
    Status: '',
    DaysToExpiration: 0,
    TimeSave: 0,
    TimeLastUpdate: 0,
    IsDeleted: false,
    TimeDeleted: 0,
    orderPrio: 0
  }

  getExpirationByIdSubscription: Subscription | undefined;

  ngOnInit(): void {
    const idExpiration = this.idExpirationClicked;
    if (idExpiration) {
      this.getExpirationByIdSubscription = this.getExpirationById(idExpiration);
    }
  }

  ngOnDestroy(): void {
    this.getExpirationByIdSubscription?.unsubscribe();
  }

  public closeModal(): void {
    this.clickModal = false;
    if (this.clickModal == false) {
      this.closeModalEvent.emit();
    }
    
  }

  private getExpirationById(idExpiration: string): Subscription {
    this.isLoading = true;
    return this._expirationService.getExpirationById(idExpiration).subscribe({
      next: response => {
        this.isLoading = false;
        this.expiration = response.data;
      },
      error: error => {
        this.isLoading = false;
        this.closeModal();
        this._expirationErrorNotificaction.getById();
      }
    });
  }

}
