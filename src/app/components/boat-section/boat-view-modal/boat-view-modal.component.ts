import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Boat } from 'src/app/interfaces/boat';

@Component({
  selector: 'app-boat-view-modal',
  templateUrl: './boat-view-modal.component.html',
  styleUrls: ['./boat-view-modal.component.scss']
})
export class BoatViewModalComponent implements OnInit {

  @Input() isOpenView!:boolean;
  @Input() boat!:Boat;

  @Output() closePopup = new EventEmitter<boolean>();

  @ViewChild('overlay') overlay!: ElementRef;
  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('dataContainer') dataContainer!: ElementRef;

  clickPopup:boolean = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit():void{
    
  }

  ngOnChanges():void{
    if (this.isOpenView == true){
      this.open_popup();
    }
  }

  // open_popup() -> abre el popup mediante DOM y setea la info correspondiente.
  private open_popup():void{
       
    const overlay = this.overlay.nativeElement;
    const popup = this.popup.nativeElement;
    const title = this.title.nativeElement;
    const dataContainer = this.dataContainer.nativeElement;

    this.renderer.addClass(overlay,'active');
    this.renderer.addClass(popup,'active');
    this.renderer.addClass(title,'active');
    this.renderer.addClass(dataContainer,'active');

  }

  // close_popup() -> cierra el popup y emite el nuevo valor de isOpen al parent component.
  public close_popup(){

    if(this.clickPopup == false){

      const overlay = this.overlay.nativeElement;
      const popup = this.popup.nativeElement;
      const title = this.title.nativeElement;
      const dataContainer = this.dataContainer.nativeElement;

      this.renderer.removeClass(overlay,'active')
      this.renderer.removeClass(popup,'active')
      this.renderer.removeClass(title,'active');
      this.renderer.removeClass(dataContainer,'active');

      this.isOpenView = false;
      this.closePopup.emit(this.isOpenView);
    }
    this.clickPopup = false;
  }

}
