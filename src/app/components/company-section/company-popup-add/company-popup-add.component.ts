import { Component, Input, OnInit, Renderer2, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-company-popup-add',
  templateUrl: './company-popup-add.component.html',
  styleUrls: ['./company-popup-add.component.scss']
})
export class CompanyPopupAddComponent implements OnInit {
  @Input() isEdit!:boolean;
  @ViewChild('overlay') overlay!: ElementRef;
  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('form') form!: ElementRef;

  clickPopup:boolean = false;
  titleText:string = "";
  btnText:string = "";
   
  constructor( private renderer: Renderer2 ) { }
  
  ngOnInit(): void {

  }

  open_popup_add():void{
    this.isEdit = false;
    this.titleText = "AÑADIR REGISTRO";
    this.btnText = "AÑADIR";
    
    const overlay = this.overlay.nativeElement;
    const popup = this.popup.nativeElement;
    const title = this.title.nativeElement;
    const form = this.form.nativeElement;


    this.renderer.addClass(overlay,'active');
    this.renderer.addClass(popup,'active');
    this.renderer.addClass(title,'active');
    this.renderer.addClass(form,'active');

    console.log(this.isEdit);  
  }
  
  open_popup_edit(){
    this.isEdit = true;
    this.titleText = "EDITAR REGISTRO";
    this.btnText = "EDITAR"

    const overlay = this.overlay.nativeElement;
    const popup = this.popup.nativeElement;
    const title = this.title.nativeElement;
    const form = this.form.nativeElement;

    this.renderer.addClass(overlay,'active');
    this.renderer.addClass(popup,'active');
    this.renderer.addClass(title,'active');
    this.renderer.addClass(form,'active');

    console.log(this.isEdit);    
  }
  
  close_popup(){

    if(this.clickPopup == false){
      const overlay = this.overlay.nativeElement;
      const popup = this.popup.nativeElement;
      const title = this.title.nativeElement;
      const form = this.form.nativeElement;
      
      
      this.renderer.removeClass(overlay,'active')
      this.renderer.removeClass(popup,'active')
      this.renderer.removeClass(title,'active');
      this.renderer.removeClass(form,'active');
      
    }
    this.clickPopup = false;
  }

}
