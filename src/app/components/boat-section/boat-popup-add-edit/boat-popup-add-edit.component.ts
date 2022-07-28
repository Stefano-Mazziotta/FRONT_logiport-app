import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Boat } from 'src/app/interfaces/boat';
import { Company } from 'src/app/interfaces/company';
import UtilsDate from 'src/app/utility/utilsDate';

@Component({
  selector: 'app-boat-popup-add-edit',
  templateUrl: './boat-popup-add-edit.component.html',
  styleUrls: ['./boat-popup-add-edit.component.scss']
})
export class BoatPopupAddEditComponent implements OnInit {

  @Input() isOpen!:boolean;
  @Input() isEdit!:boolean;
  @Input() boatEdit:Boat | null = null;

  @Output() closePopup = new EventEmitter<boolean>();
  @Output() isSubmit = new EventEmitter<Boat>();

  @ViewChild('overlay') overlay!: ElementRef;
  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('form') form!: ElementRef;
  @ViewChild('enrollmentDateInput') enrollmentDateInput!: ElementRef;
  @ViewChild('constructionDateInput') constructionDateInput!: ElementRef;

  clickPopup:boolean = false;
  titleText:string = "";
  btnText:string = "";

  BoatForm: FormGroup;

  constructor( private renderer: Renderer2, private fb: FormBuilder) {
    this.BoatForm = this.fb.group({
      boatName: ['', Validators.required],
      enrollment: ['', Validators.required],
      distinguishingMark: ['', Validators.required],
      hullMaterial: ['', Validators.required],
      boatType: ['', Validators.required],
      service: ['', Validators.required],
      specificExploitation: ['', Validators.required],
      enrollmentDate: ['', Validators.required],
      constructionDate: ['', Validators.required],
      nat: ['', Validators.required],
      nan: ['', Validators.required],
      eslora: ['', Validators.required],
      manga: ['', Validators.required],
      puntal: ['', Validators.required],
      peopleTransported: ['', Validators.required],
      boatPower: ['', Validators.required],
      electricPower: ['', Validators.required]      
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges():void {

    if(this.isOpen == true){
      this.open_popup();
    }
  }

  // open_popup() -> open popup with DOM.
  private open_popup():void{
    console.log(this.boatEdit);
    const overlay = this.overlay.nativeElement;
    const popup = this.popup.nativeElement;
    const title = this.title.nativeElement;
    const form = this.form.nativeElement;

    const enrollmentDateInput  = this.enrollmentDateInput.nativeElement;
    const constructionDateInput = this.constructionDateInput.nativeElement;

    this.renderer.addClass(overlay,'active');
    this.renderer.addClass(popup,'active');
    this.renderer.addClass(title,'active');
    this.renderer.addClass(form,'active');

    this.renderer.setAttribute(enrollmentDateInput, 'type', 'text');
    this.renderer.setAttribute(constructionDateInput, 'type', 'text');

    if (this.isEdit == false){

      this.titleText = "AÑADIR LANCHA";
      this.btnText = "AÑADIR";
    }

    if(this.isEdit == true && this.boatEdit != null){

      this.titleText = "EDITAR LANCHA";
      this.btnText = "EDITAR"
      
      let enrollmentTimestamp = this.boatEdit.EnrollmentDate
      let constructionTimestamp = this.boatEdit.ConstructionDate;      
      
      let enrollmentDate:string = "";
      let constructionDate:string = "";

      if(enrollmentTimestamp){
        enrollmentDate =  UtilsDate.timestampToDate(enrollmentTimestamp);
      }
      if(constructionTimestamp){
        constructionDate = UtilsDate.timestampToDate(constructionTimestamp);
      }

      this.BoatForm.get('boatName')?.setValue(`${this.boatEdit.BoatName}`); 
      this.BoatForm.get('enrollment')?.setValue(`${this.boatEdit.Enrollment}`); 
      this.BoatForm.get('distinguishingMark')?.setValue(`${this.boatEdit.DistinguishingMark}`); 
      this.BoatForm.get('hullMaterial')?.setValue(`${this.boatEdit.HullMaterial}`); 
      this.BoatForm.get('boatType')?.setValue(`${this.boatEdit.BoatType}`); 
      this.BoatForm.get('service')?.setValue(`${this.boatEdit.Service}`); 
      this.BoatForm.get('specificExploitation')?.setValue(`${this.boatEdit.SpecificExploitation}`); 
      this.BoatForm.get('enrollmentDate')?.setValue(`${enrollmentDate}`); 
      this.BoatForm.get('constructionDate')?.setValue(`${constructionDate}`); 
      this.BoatForm.get('nat')?.setValue(`${this.boatEdit.NAT}`); 
      this.BoatForm.get('nan')?.setValue(`${this.boatEdit.NAN}`); 
      this.BoatForm.get('eslora')?.setValue(`${this.boatEdit.Eslora}`); 
      this.BoatForm.get('manga')?.setValue(`${this.boatEdit.Manga}`); 
      this.BoatForm.get('puntal')?.setValue(`${this.boatEdit.Puntal}`); 
      this.BoatForm.get('peopleTransported')?.setValue(`${this.boatEdit.PeopleTransported}`); 
      this.BoatForm.get('boatPower')?.setValue(`${this.boatEdit.BoatPower}`); 
      this.BoatForm.get('electricPower')?.setValue(`${this.boatEdit.ElectricPower}`); 
    }

  }

  // close_popup() -> close popup and emit new value "isOpen" to parent component.
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

      this.BoatForm.reset();

      this.isOpen = false;
      this.closePopup.emit(this.isOpen);
    }
    this.clickPopup = false;
  }

  // onSubmit() ===> on click "añadir" execute this method.
  // get values of inputs and store them in the object Boat.
  // emit this object to father component for consume insertBoat or UpdateBoat service.
  public onSubmit(){
    
    let companyJson = localStorage.getItem("companySelected");
    let companySelected:Company;
    let boat:Boat;

    let idBoatEdit = null;
    if(this.isEdit && this.boatEdit){
      idBoatEdit = this.boatEdit.IdBoat
    }

    if(companyJson != null){
      companySelected = JSON.parse(companyJson);

      let enrollmentDate:string = this.BoatForm.get('enrollmentDate')?.value;
      let constructionDate:string = this.BoatForm.get('constructionDate')?.value;
      
      enrollmentDate = UtilsDate.formatDateToYYYYMMDD(enrollmentDate);
      constructionDate = UtilsDate.formatDateToYYYYMMDD(constructionDate);

      let enrollmentTimestamp:number = UtilsDate.dateToTimestamp( new Date(enrollmentDate) );
      let constructionTimestamp:number = UtilsDate.dateToTimestamp( new Date(constructionDate) );
      
      boat = {
        IdBoat: this.isEdit ? idBoatEdit : null,
        IdCompany: companySelected.IdCompany,
        BoatName: this.BoatForm.get('boatName')?.value,
        Enrollment: this.BoatForm.get('enrollment')?.value,
        DistinguishingMark: this.BoatForm.get('distinguishingMark')?.value, 
        HullMaterial: this.BoatForm.get('hullMaterial')?.value,
        BoatType: this.BoatForm.get('boatType')?.value,
        Service: this.BoatForm.get('service')?.value,
        SpecificExploitation: this.BoatForm.get('specificExploitation')?.value,
        EnrollmentDate: enrollmentTimestamp,
        ConstructionDate: constructionTimestamp, 
        NAT: parseInt(this.BoatForm.get('nat')?.value),
        NAN: parseInt(this.BoatForm.get('nan')?.value),
        Eslora: this.BoatForm.get('eslora')?.value,
        Manga: this.BoatForm.get('manga')?.value,
        Puntal: this.BoatForm.get('puntal')?.value,
        PeopleTransported: this.BoatForm.get('peopleTransported')?.value,
        BoatPower: this.BoatForm.get('boatPower')?.value,
        ElectricPower: this.BoatForm.get('electricPower')?.value,
        IsDeleted: null,
        TimeSave: null,
        TimeDeleted: null,
        TimeLastUpdate: null
      };
      
      this.isSubmit.emit(boat);
    }   
    
    this.close_popup();
  }

  


}
