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
  @Output() closePopup = new EventEmitter<boolean>();
  @Output() isSubmit = new EventEmitter<Company>();

  @ViewChild('overlay') overlay!: ElementRef;
  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('form') form!: ElementRef;

  clickPopup:boolean = false;
  titleText:string = "";
  btnText:string = "";

  addCompanyForm: FormGroup;
  company:Company | undefined;

  constructor( private renderer: Renderer2, private fb: FormBuilder, private _companyService:CompanyService) {
    this.addCompanyForm = this.fb.group({
      razonSocial: ['', Validators.required],
      CUIT: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
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

    if (this.isEdit == false){

      this.titleText = "AÑADIR REGISTRO";
      this.btnText = "AÑADIR";
    }

    if(this.isEdit == true){
      this.titleText = "EDITAR REGISTRO";
      this.btnText = "EDITAR"
    }

    const overlay = this.overlay.nativeElement;
    const popup = this.popup.nativeElement;
    const title = this.title.nativeElement;
    const form = this.form.nativeElement;

    this.renderer.addClass(overlay,'active');
    this.renderer.addClass(popup,'active');
    this.renderer.addClass(title,'active');
    this.renderer.addClass(form,'active');
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

      this.isOpen = false;
      this.closePopup.emit(this.isOpen);
    }
    this.clickPopup = false;
  }

  // onSubmit() -> al dar click en "añadir" se ejecuta este método.
  // obtiene los valores de los inputs los almacena en el objeto Company
  // emite este objeto al componente padre para consumir el servicio insertCompany.
  public onSubmit(){
    this.company = {
      comRazSoc: this.addCompanyForm.get('razonSocial')?.value,
      comCUIT: parseInt(this.addCompanyForm.get('CUIT')?.value),
      comInsGra: Date.now()
    };
    this.isSubmit.emit(this.company);

    this.addCompanyForm.reset();
    this.close_popup();
  }

}
