import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICompany, ICreateCompanyDTO, IUpdateCompanyDTO } from 'src/app/interfaces/company';

@Component({
  selector: 'app-company-popup-add-edit',
  templateUrl: './company-popup-add-edit.component.html',
  styleUrls: ['./company-popup-add-edit.component.scss']
})
export class CompanyPopupAddComponent implements OnInit, OnChanges {

  @Input() isOpen!: boolean;
  @Input() isEdit!: boolean;
  @Input() companyToUpdate: ICompany | null = null;

  @Output() eventClosePopup = new EventEmitter<boolean>();
  @Output() eventCreateSubmit = new EventEmitter<ICreateCompanyDTO>();
  @Output() eventUpdateSubmit = new EventEmitter<IUpdateCompanyDTO>();

  @ViewChild('overlay') $overlay!: ElementRef;
  @ViewChild('popup') $popup!: ElementRef;
  @ViewChild('title') $title!: ElementRef;
  @ViewChild('form') $form!: ElementRef;

  clickPopup: boolean = false;
  titleText: string = "";
  btnText: string = "";

  companyForm: FormGroup;
  company: ICompany | null = null;

  constructor(private renderer: Renderer2, private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      razonSocial: ['', Validators.required],
      CUIT: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]]
    })
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(): void {

    if (this.isOpen == true) {
      this.openPopup();
    }
  }

  private openPopup(): void {

    const $overlay = this.$overlay.nativeElement;
    const $popup = this.$popup.nativeElement;
    const $title = this.$title.nativeElement;
    const $form = this.$form.nativeElement;

    this.renderer.addClass($overlay, 'active');
    this.renderer.addClass($popup, 'active');
    this.renderer.addClass($title, 'active');
    this.renderer.addClass($form, 'active');

    if (this.isEdit == false) {

      this.titleText = "AÑADIR EMPRESA";
      this.btnText = "AÑADIR";
    }

    if (this.isEdit == true && this.companyToUpdate) {
      this.titleText = "EDITAR EMPRESA";
      this.btnText = "EDITAR"

      this.companyForm.get('razonSocial')?.setValue(this.companyToUpdate.RazonSocial);
      this.companyForm.get('CUIT')?.setValue(this.companyToUpdate.CUIT);  

    }

  }

  public closePopup(): void {

    if (this.clickPopup == false) {

      const $overlay = this.$overlay.nativeElement;
      const $popup = this.$popup.nativeElement;
      const $title = this.$title.nativeElement;
      const $form = this.$form.nativeElement;

      this.renderer.removeClass($overlay, 'active')
      this.renderer.removeClass($popup, 'active')
      this.renderer.removeClass($title, 'active');
      this.renderer.removeClass($form, 'active');

      this.companyForm.reset();

      this.isOpen = false;
      this.eventClosePopup.emit(this.isOpen);
    }
    
    this.clickPopup = false;
  }

  public onSubmit(): void {

    const razonSocial = this.companyForm.get('razonSocial')?.value;
    const cuit = this.companyForm.get('CUIT')?.value;

    if (this.isEdit && this.companyToUpdate) {

      const idCompany = this.companyToUpdate.IdCompany;

      const updateCompanyDto: IUpdateCompanyDTO = {
        idCompany,
        razonSocial,
        cuit
      }

      this.eventUpdateSubmit.emit(updateCompanyDto);
      this.closePopup();
      return;
    }

    const createCompanyDto: ICreateCompanyDTO = {
      razonSocial,
      cuit
    }

    this.eventCreateSubmit.emit(createCompanyDto);
    this.closePopup();
  }
}
