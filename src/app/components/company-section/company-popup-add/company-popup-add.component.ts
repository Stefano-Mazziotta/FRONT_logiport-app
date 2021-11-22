import { Component, OnInit, Renderer2, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-company-popup-add',
  templateUrl: './company-popup-add.component.html',
  styleUrls: ['./company-popup-add.component.scss']
})
export class CompanyPopupAddComponent implements OnInit {
  @ViewChild('overlay') overlay!: ElementRef;
  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('form') form!: ElementRef;
  clickPopup:boolean= false;
   
  constructor( private renderer: Renderer2 ) { }
  
  ngOnInit(): void {

  }

  open_popup():void{
    const overlay = this.overlay.nativeElement;
    const popup = this.popup.nativeElement;
    const title = this.title.nativeElement;
    const form = this.form.nativeElement;

    this.renderer.addClass(overlay,'active');
    this.renderer.addClass(popup,'active');
    this.renderer.addClass(title,'active');
    this.renderer.addClass(form,'active');


    console.log(overlay);
    console.log(popup);
    // this.renderer.addClass(this.overlay.nativeElemannotent, "active");  
  
  }

  close_popup(){

    if(this.clickPopup == false){
      const overlay = this.overlay.nativeElement;
      const popup = this.popup.nativeElement;
      
      this.renderer.removeClass(overlay,'active')
      this.renderer.removeClass(popup,'active')
      
    }
    this.clickPopup = false;
  }
  
}
