import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { ExpirationErrorNotificationService } from 'src/app/services/expiration/expiration-error-notification/expiration-error-notification.service';
import { ExpirationService } from 'src/app/services/expiration/expiration.service'; 
import { IExpiration, ICreateExpirationDTO, IUpdateExpirationDTO } from 'src/app/interfaces/expiration';
import UtilsDate from 'src/app/utils/utilsDate';

@Component({
  selector: 'app-expiration-create-update-modal',
  templateUrl: './expiration-create-update-modal.component.html',
  styleUrls: ['./expiration-create-update-modal.component.scss']
})
export class ExpirationCreateUpdateModalComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private _expirationService: ExpirationService,
    private _expirationErrorNotification: ExpirationErrorNotificationService,
    private toastr: ToastrService  
  ) {
    this.expirationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });
  }

  @Output() closeModalEvent = new EventEmitter<boolean>();

  @Input() isUpdate: boolean = false;
  @Input() idExpirationClicked: string | null = null;
  @Input() idBoatSelected: string | null = null;

  expirationForm: FormGroup;

  clickModal: boolean = false;
  titleText: string = "";
  btnText: string = "";

  isLoading: boolean = false;

  createExpirationSubscription: Subscription | undefined;
  updateExpirationSubscription: Subscription | undefined;
  getExpirationByIdSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.titleText = "AÑADIR VENCIMIENTO";
    this.btnText = "AÑADIR";

    if (this.isUpdate && this.idExpirationClicked) {
      this.getExpirationByIdSubscription = this.getExpirationById(this.idExpirationClicked);

      this.titleText = "EDITAR VENCIMIENTO";
      this.btnText = "EDITAR"

    }
  }

  public ngOnDestroy(): void {
    this.createExpirationSubscription?.unsubscribe();
    this.updateExpirationSubscription?.unsubscribe();
    this.getExpirationByIdSubscription?.unsubscribe();
  }

  public closeModal(isSendRequest: boolean = false): void {
    if (this.clickModal == false && !this.isLoading) {

      this.expirationForm.reset();
      this.closeModalEvent.emit(isSendRequest);
    }

    this.clickModal = false;
  }

  public onSubmit(): void {
    let expiration: ICreateExpirationDTO | IUpdateExpirationDTO = this.getFormData();

    if (this.isUpdate && this.idExpirationClicked) {
      expiration = {
        idExpiration: this.idExpirationClicked,
        ...expiration
      };

      this.updateExpirationSubscription = this.updateExpiration(expiration);
      return;
    }

    this.createExpirationSubscription = this.createExpiration(expiration);
  }

  private getExpirationById(idExpiration: string): Subscription {
    this.isLoading = true;

    return this._expirationService.getExpirationById(idExpiration).subscribe({
      next: response => {
        const generator: IExpiration = response.data;

        this.isLoading = false;
        this.setFormValues(generator);
      },
      error: error => {
        this.isLoading = false;
        this.closeModal();
        this._expirationErrorNotification.getById();
      }
    });
  }

  private createExpiration(expiration: ICreateExpirationDTO): Subscription {
    this.isLoading = true;
    return this._expirationService.createExpiration(expiration).subscribe({
      next: response => {
        this.isLoading = false;
        this.toastr.success("Vencimiento creado.", "Enhorabuena!");
        this.closeModal(true);
      },
      error: error => {
        this.isLoading = false;
        this._expirationErrorNotification.create();
      }
    });
  }

  private updateExpiration(expiration: IUpdateExpirationDTO): Subscription {
    this.isLoading = true;

    return this._expirationService.updateExpiration(expiration).subscribe({
      next: response => {
        this.isLoading = false;
        this.toastr.success("Vencimiento actualizado.", "Enhorabuena!");
        this.closeModal(true);
      },
      error: error => {
        this.isLoading = false;
        this._expirationErrorNotification.update();
      }
    });
  }

  private getFormData(): ICreateExpirationDTO {

    let expirationDate: string = this.expirationForm.get('expirationDate')?.value;
    expirationDate = UtilsDate.formatDateToYYYYMMDD(expirationDate);

    const expirationDateTimestamp: number = UtilsDate.dateToTimestamp(new Date(expirationDate));

    const expiration: ICreateExpirationDTO = {
      idBoat: this.idBoatSelected == null ? "" : this.idBoatSelected,
      title: this.expirationForm.get('title')?.value,
      description: this.expirationForm.get('description')?.value,
      expirationDate: expirationDateTimestamp,
    };

    return expiration;
  }

  private setFormValues(expiration: IExpiration): void {

    let expirationDateTimestamp = expiration.ExpirationDate;
    let expirationDate: string = "";

    if (expirationDateTimestamp) {
      expirationDate = UtilsDate.timestampToDate(expirationDateTimestamp);
    }

    this.expirationForm.get('title')?.setValue(`${expiration.Title}`);
    this.expirationForm.get('description')?.setValue(`${expiration.Description}`);
    this.expirationForm.get('expirationDate')?.setValue(`${expirationDate}`);
  }

}
