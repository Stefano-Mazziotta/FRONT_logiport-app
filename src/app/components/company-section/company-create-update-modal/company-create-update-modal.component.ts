import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ICreateCompanyDTO, IUpdateCompanyDTO } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company/company.service';
import { CompanyErrorNotificationService } from 'src/app/services/company/company-error-notification/company-error-notification.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-create-update-modal',
  templateUrl: './company-create-update-modal.component.html',
  styleUrls: ['./company-create-update-modal.component.scss']
})
export class CompanyCreateUpdateModalComponent implements OnInit, OnChanges, OnDestroy {

  @Input() isUpdate!: boolean;
  @Input() idCompanyClicked: string | null = null;

  @Output() closeModalEvent = new EventEmitter<boolean>();

  clickPopup: boolean = false;
  titleText: string = "";
  btnText: string = "";

  isLoading = false;

  companyForm: FormGroup;

  createCompanySubscription: Subscription | undefined;
  updateCompanySubscription: Subscription | undefined;
  getCompanyByIdSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private _companyService: CompanyService,
    private _companyErrorNotification: CompanyErrorNotificationService,
    private toastr: ToastrService
  ) {

    this.companyForm = this.fb.group({
      razonSocial: ['', Validators.required],
      CUIT: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]]
    });

  }

  public ngOnInit(): void {

    if (this.isUpdate && this.idCompanyClicked) {
      this.getCompanyByIdSubscription = this.getCompanyById(this.idCompanyClicked);

      this.titleText = "EDITAR EMPRESA";
      this.btnText = "EDITAR"
      return;
    }

    this.titleText = "AÑADIR EMPRESA";
    this.btnText = "AÑADIR";
  }

  public ngOnChanges(): void {
  }

  public ngOnDestroy(): void {
    this.createCompanySubscription?.unsubscribe();
    this.updateCompanySubscription?.unsubscribe();
    this.getCompanyByIdSubscription?.unsubscribe(); 
  }

  public closePopup(isSendRequest: boolean = false): void {

    if (this.clickPopup == false && !this.isLoading) {

      this.companyForm.reset();
      this.closeModalEvent.emit(isSendRequest);
    }

    this.clickPopup = false;
  }

  public onSubmit(): void {

    const idCompany = this.idCompanyClicked;
    const razonSocial = this.companyForm.get('razonSocial')?.value;
    const cuit = this.companyForm.get('CUIT')?.value;

    if (this.isUpdate && idCompany) {

      const updateCompanyDto: IUpdateCompanyDTO = {
        idCompany,
        razonSocial,
        cuit
      }

      this.updateCompanySubscription = this.updateCompany(updateCompanyDto);
      return;
    }

    const createCompanyDto: ICreateCompanyDTO = {
      razonSocial,
      cuit
    }

    this.createCompanySubscription = this.createCompany(createCompanyDto);
  }

  private createCompany(createCompanyDto: ICreateCompanyDTO): Subscription {
    this.isLoading = true;
    return this._companyService.createCompany(createCompanyDto).subscribe({
      next: response => {
        this.isLoading = false;
        this.closePopup(true);
        this.toastr.success("Empresa creada.", "Enhorabuena!");
      },
      error: error => {
        const { status } = error;

        this.isLoading = false;
        this._companyErrorNotification.create();
      }
    });
  }

  private updateCompany(companyDto: IUpdateCompanyDTO): Subscription {
    this.isLoading = true;
    return this._companyService.updateCompany(companyDto).subscribe({
      next: response => {
        this.isLoading = false;
        this.closePopup(true);
        this.toastr.success("Empresa actualizada.", "Enhorabuena!");
      },
      error: error => {
        this.isLoading = false;
        this._companyErrorNotification.update();
      }
    });
  }

  private getCompanyById(idCompany: string): Subscription {
    this.isLoading = true;
    return this._companyService.getCompanyById(idCompany).subscribe({
      next: response => {
        this.companyForm.get('razonSocial')?.setValue(response.data.RazonSocial);
        this.companyForm.get('CUIT')?.setValue(response.data.CUIT);
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
        this.closePopup();
        this._companyErrorNotification.getById();
      }
    });
  }


}
