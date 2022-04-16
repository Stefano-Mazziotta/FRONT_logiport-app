import { Component,  OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import {Input, Output, OnChanges, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company.service'

@Component({
  selector: 'app-company-popup-add-edit',
  templateUrl: './company-popup-add-edit.component.html',
  styleUrls: ['./company-popup-add-edit.component.scss']
})
export class CompanyPopupAddComponent implements OnInit, OnChanges {

  @Input() isOpen!:boolean;
  @Input() isEdit!:boolean;
  @Input() companyEdit:any;
  @Output() closePopup = new EventEmitter<boolean>();
  @Output() isSubmit = new EventEmitter<Company>();

  @ViewChild('overlay') overlay!: ElementRef;
  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('form') form!: ElementRef;

  clickPopup:boolean = false;
  titleText:string = "";
  btnText:string = "";

  CompanyForm: FormGroup;
  company:Company | undefined;

  constructor( private renderer: Renderer2, private fb: FormBuilder, private _companyService:CompanyService) {
    this.CompanyForm = this.fb.group({
      razonSocial: ['', Validators.required],
      CUIT: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]]
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges():void {

    if(this.isOpen == true){
      this.open_popup();
    }
  }

  // open_popup() -> abre el popup mediante DOM.
  private open_popup():void{

    const overlay = this.overlay.nativeElement;
    const popup = this.popup.nativeElement;
    const title = this.title.nativeElement;
    const form = this.form.nativeElement;

    this.renderer.addClass(overlay,'active');
    this.renderer.addClass(popup,'active');
    this.renderer.addClass(title,'active');
    this.renderer.addClass(form,'active');

    if (this.isEdit == false){

      this.titleText = "AÑADIR REGISTRO";
      this.btnText = "AÑADIR";
    }

    if(this.isEdit == true){
      this.titleText = "EDITAR REGISTRO";
      this.btnText = "EDITAR"

      form[0].value = this.companyEdit.comRazSoc;
      form[1].value = this.companyEdit.comCUIT;
    }

  }

  // close_popup() -> cierra el popup y emite el nuevo valor de isOpen al parent component.
  public close_popup(){

    if(this.clickPopup == false){

      const overlay = this.overlay.nativeElement;
      const popup = this.popup.nativeElement;
      const title = this.title.nativeElement;
      const form = this.form.nativeElement;

      this.renderer.removeClass(overlay,'active')
      this.renderer.removeClass(popup,'active')
      this.renderer.removeClass(title,'active');
      this.renderer.removeClass(form,'active');

      form[0].value = "";
      form[1].value = "";

      this.CompanyForm.reset();

      this.isOpen = false;
      this.closePopup.emit(this.isOpen);
    }
    this.clickPopup = false;
  }

  // onSubmit() ===> al dar click en "añadir" se ejecuta este método.
  // obtiene los valores de los inputs los almacena en el objeto Company
  // emite este objeto al componente padre para consumir el servicio insertCompany.
  public onSubmit(){

    if(this.isEdit == false){

      this.company = {
        comRazSoc: this.CompanyForm.get('razonSocial')?.value,
        comCUIT: parseInt(this.CompanyForm.get('CUIT')?.value)
      };

      this.isSubmit.emit(this.company);
      this.close_popup();
    }

    if(this.isEdit == true){

      this.company = {
        comRazSoc: this.CompanyForm.get('razonSocial')?.value,
        comCUIT: parseInt(this.CompanyForm.get('CUIT')?.value)
      };

      this.isSubmit.emit(this.company);
      this.close_popup();
    }

  }
}
