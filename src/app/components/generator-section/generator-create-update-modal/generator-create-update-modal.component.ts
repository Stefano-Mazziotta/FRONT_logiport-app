import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { GeneratorErrorNotificationService } from 'src/app/services/generator/generator-error-notification/generator-error-notification.service';
import { GeneratorService } from 'src/app/services/generator/generator.service';
import { IGenerator, ICreateGeneratorDTO, IUpdateGeneratorDTO } from 'src/app/interfaces/generator';

@Component({
  selector: 'app-generator-create-update-modal',
  templateUrl: './generator-create-update-modal.component.html',
  styleUrls: ['./generator-create-update-modal.component.scss']
})
export class GeneratorCreateUpdateModalComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private _generatorService: GeneratorService,
    private _generatorErrorNotification: GeneratorErrorNotificationService,
    private toastr: ToastrService
  ) {
    this.generatorForm = this.formBuilder.group({
      quantity: ['', Validators.required],
      brand: ['', Validators.required],
      numberGenerator: ['', Validators.required],
      model: ['', Validators.required],
      type: ['', Validators.required],
      power: ['', Validators.required],
    });
  }

  @Output() closeModalEvent = new EventEmitter<boolean>();

  @Input() isUpdate: boolean = false;
  @Input() idGeneratorClicked: string | null = null;
  @Input() idBoatSelected: string | null = null;

  generatorForm: FormGroup;

  clickModal: boolean = false;
  titleText: string = "";
  btnText: string = "";

  isLoading: boolean = false;

  createGeneratorSubscription: Subscription | undefined;
  updateGeneratorSubscription: Subscription | undefined;
  getGeneratorByIdSubscription: Subscription | undefined;

  public ngOnInit(): void {

    this.titleText = "AÑADIR GENERADOR";
    this.btnText = "AÑADIR";

    if (this.isUpdate && this.idGeneratorClicked) {
      this.getGeneratorByIdSubscription = this.getGeneratorById(this.idGeneratorClicked);

      this.titleText = "EDITAR GENERADOR";
      this.btnText = "EDITAR"

    }
  }

  public ngOnDestroy(): void {
    this.createGeneratorSubscription?.unsubscribe();
    this.updateGeneratorSubscription?.unsubscribe();
    this.getGeneratorByIdSubscription?.unsubscribe();
  }

  public closeModal(isSendRequest: boolean = false): void {
    if (this.clickModal == false && !this.isLoading) {

      this.generatorForm.reset();
      this.closeModalEvent.emit(isSendRequest);
    }

    this.clickModal = false;
  }

  public onSubmit(): void {
    let generator: ICreateGeneratorDTO | IUpdateGeneratorDTO = this.getFormData();

    if (this.isUpdate && this.idGeneratorClicked) {
      generator = {
        idGenerator: this.idGeneratorClicked,
        ...generator
      };

      this.updateGeneratorSubscription = this.updateGenerator(generator);
      return;
    }

    this.createGeneratorSubscription = this.createGenerator(generator);
  }

  private getGeneratorById(idGenerator: string): Subscription {
    this.isLoading = true;

    return this._generatorService.getGeneratorById(idGenerator).subscribe({
      next: response => {
        const generator: IGenerator = response.data;

        this.isLoading = false;
        this.setFormValues(generator);
      },
      error: error => {
        this.isLoading = false;
        this.closeModal();
        this._generatorErrorNotification.getById();
      }
    });
  }

  private createGenerator(generator: ICreateGeneratorDTO): Subscription {
    this.isLoading = true;
    return this._generatorService.createGenerator(generator).subscribe({
      next: response => {
        this.isLoading = false;
        this.toastr.success("Generador creado.", "Enhorabuena!");
        this.closeModal(true);
      },
      error: error => {
        this.isLoading = false;
        this._generatorErrorNotification.create();
      }
    });
  }

  private updateGenerator(generator: IUpdateGeneratorDTO): Subscription {
    this.isLoading = true;

    return this._generatorService.updateGenerator(generator).subscribe({
      next: response => {
        this.isLoading = false;
        this.toastr.success("Generador actualizado.", "Enhorabuena!");
        this.closeModal(true);
      },
      error: error => {
        this.isLoading = false;
        this._generatorErrorNotification.update();
      }
    });
  }

  private getFormData(): ICreateGeneratorDTO {

    const generator: ICreateGeneratorDTO = {
      idBoat: this.idBoatSelected == null ? "" : this.idBoatSelected,
      quantity: this.generatorForm.get('quantity')?.value,
      brand: this.generatorForm.get('brand')?.value,
      numberGenerator: this.generatorForm.get('numberGenerator')?.value,
      model: this.generatorForm.get('model')?.value,
      type: this.generatorForm.get('type')?.value,
      power: this.generatorForm.get('power')?.value,
    };

    return generator;
  }

  private setFormValues(generator: IGenerator): void {
    this.generatorForm.get('quantity')?.setValue(`${generator.Quantity}`);
    this.generatorForm.get('brand')?.setValue(`${generator.Brand}`);
    this.generatorForm.get('numberGenerator')?.setValue(`${generator.NumberGenerator}`);
    this.generatorForm.get('model')?.setValue(`${generator.Model}`);
    this.generatorForm.get('type')?.setValue(`${generator.Type}`);
    this.generatorForm.get('power')?.setValue(`${generator.Power}`);
  }

}
