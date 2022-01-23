import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-company-popup-confirm-delete',
  templateUrl: './company-popup-confirm-delete.component.html',
  styleUrls: ['./company-popup-confirm-delete.component.scss']
})
export class CompanyPopupConfirmDeleteComponent implements OnInit {
  @Input() isOpenConfirmDelete!:boolean;
  @Output() closePopup = new EventEmitter<boolean>();
  @Output() isDelete = new EventEmitter<boolean>();

  clickPopup:boolean = false;

  @ViewChild('overlay') overlay!: ElementRef;
  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('buttonsWrap') buttonsWrap!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void{
    if (this.isOpenConfirmDelete == true){
      this.open_popup();
    }
  }

  // open_popup() -> abre el popup mediante DOM.
  private open_popup():void{
    const overlay = this.overlay.nativeElement;
    const popup = this.popup.nativeElement;
    const title = this.title.nativeElement;
    const buttonsWrap = this.buttonsWrap.nativeElement;

    this.renderer.addClass(overlay,'active');
    this.renderer.addClass(popup,'active');
    this.renderer.addClass(title,'active');
    this.renderer.addClass(buttonsWrap,'active');
  }

  // close_popup() -> cierra el popup y emite el nuevo valor de isOpen al parent component.
  public close_popup(e:any){

    if(e.path[0].className != "popup-overlay active"){
      this.clickPopup = true;
    }
    if(e.path[0].nodeName == "svg"){
      this.clickPopup = false;
    }
    if(e.path[0].nodeName == "BUTTON"){
      this.clickPopup = false;
    }

    if(this.clickPopup == false){

      const overlay = this.overlay.nativeElement;
      const popup = this.popup.nativeElement;
      const title = this.title.nativeElement;
      const buttonsWrap = this.buttonsWrap.nativeElement;

      this.renderer.removeClass(overlay,'active')
      this.renderer.removeClass(popup,'active')
      this.renderer.removeClass(title,'active');
      this.renderer.removeClass(buttonsWrap,'active');

      this.isOpenConfirmDelete = false;
      this.closePopup.emit(this.isOpenConfirmDelete);
    }
    this.clickPopup = false;
  }
  is_delete(){
    this.isDelete.emit(true);
  }

}
