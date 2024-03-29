import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { CompanyService } from 'src/app/services/company/company.service';
import { CompanyErrorNotificationService } from 'src/app/services/company/company-error-notification/company-error-notification.service';

import { BoatService } from 'src/app/services/boat/boat.service';
import { BoatErrorNotificationService } from 'src/app/services/boat/boat-error-notification/boat-error-notification.service';

import { MotorService } from 'src/app/services/motor/motor.service';
import { MotorErrorNotificationService } from 'src/app/services/motor/motor-error-notification/motor-error-notification.service';

import { GeneratorService } from 'src/app/services/generator/generator.service';
import { GeneratorErrorNotificationService } from 'src/app/services/generator/generator-error-notification/generator-error-notification.service';

import { ExpirationService } from 'src/app/services/expiration/expiration.service';
import { ExpirationErrorNotificationService } from 'src/app/services/expiration/expiration-error-notification/expiration-error-notification.service';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent implements OnDestroy {

  constructor(
    private _companyService: CompanyService,
    private _companyErrorNotification: CompanyErrorNotificationService,
    private _boatService: BoatService,
    private _boatErrorNotification: BoatErrorNotificationService,
    private _motorService: MotorService,
    private _motorErrorNotification: MotorErrorNotificationService,
    private _generatorService: GeneratorService,
    private _generatorErrorNotification: GeneratorErrorNotificationService,
    private _expirationService: ExpirationService,
    private _expirationErrorNotification: ExpirationErrorNotificationService,
    private toastr: ToastrService,
  ) { }

  @Input() section!: string;
  @Input() idEntityClicked!: string;

  @Output() closeModalEvent = new EventEmitter<boolean>();

  clickModal: boolean = false;

  isLoading: boolean = false;

  deleteCompanySubscription: Subscription | undefined;
  deleteBoatSubscription: Subscription | undefined;
  deleteMotorSubscription: Subscription | undefined;
  deleteGeneratorSubscription: Subscription | undefined;
  deleteExpirationSubscription: Subscription | undefined;

  public ngOnDestroy(): void {
    this.deleteCompanySubscription?.unsubscribe();
    this.deleteBoatSubscription?.unsubscribe();
    this.deleteMotorSubscription?.unsubscribe(); 
    this.deleteGeneratorSubscription?.unsubscribe(); 
    this.deleteExpirationSubscription?.unsubscribe(); 
  }

  public closeModal(isSendRequest:boolean = false) {
    this.clickModal = false;
    if (this.clickModal == false && !this.isLoading) {
      this.closeModalEvent.emit(isSendRequest);
    }
    
  }

  public delete(): void {
    if (this.section === "company") {
      this.deleteCompanySubscription = this.deleteCompany();
    }
    if(this.section === "boat"){
      this.deleteBoatSubscription = this.deleteBoat();
    }
    if(this.section === "motor"){
      this.deleteMotorSubscription = this.deleteMotor();
    }
    if(this.section === "generator"){
      this.deleteGeneratorSubscription = this.deleteGenerator();
    }
    if(this.section === "expiration"){
      this.deleteExpirationSubscription = this.deleteExpiration();
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

  private deleteMotor(): Subscription {
    this.isLoading = true;

    return this._motorService.deleteMotor(this.idEntityClicked).subscribe({
      next: response => {
        this.isLoading = false;
        this.closeModal(true);
        this.toastr.success("Motor eliminado.", "Enhorabuena!");
      },
      error: error => {
        this.isLoading = false;
        this._motorErrorNotification.delete();
      }
    });
  }

  private deleteGenerator(): Subscription {
    this.isLoading = true;

    return this._generatorService.deleteGenerator(this.idEntityClicked).subscribe({
      next: response => {
        this.isLoading = false;
        this.closeModal(true);
        this.toastr.success("Generador eliminado.", "Enhorabuena!");
      },
      error: error => {
        this.isLoading = false;
        this._generatorErrorNotification.delete();
      }
    });
  }
  
  private deleteExpiration(): Subscription {
    this.isLoading = true;

    return this._expirationService.deleteExpiration(this.idEntityClicked).subscribe({
      next: response => {
        this.isLoading = false;
        this.closeModal(true);
        this.toastr.success("Vencimiento eliminado.", "Enhorabuena!");
      },
      error: error => {
        this.isLoading = false;
        this._expirationErrorNotification.delete();
      }
    })

  }
}


