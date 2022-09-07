import { Component, OnInit } from '@angular/core';
import { Renderer2, ViewChild, ElementRef } from '@angular/core';
import { OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ICompany } from 'src/app/interfaces/company';

@Component({
  selector: 'app-company-popup-view',
  templateUrl: './company-popup-view.component.html',
  styleUrls: ['./company-popup-view.component.scss']
})
export class CompanyPopupViewComponent implements OnInit, OnChanges {

  @Input() isOpenView!: boolean;
  @Input() company: ICompany = {
    IdCompany: "",
    RazonSocial: "",
    CUIT: 0,
    IsDeleted: 0,
    TimeDeleted: 0,
    TimeLastUpdate: 0,
    TimeSave: 0
  };

  @Output() eventClosePopup = new EventEmitter<boolean>();

  @ViewChild('overlay') $overlay!: ElementRef;
  @ViewChild('popup') $popup!: ElementRef;
  @ViewChild('title') $title!: ElementRef;
  @ViewChild('dataContainer') $dataContainer!: ElementRef;

  clickPopup: boolean = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.isOpenView == true) {
      this.openPopup();
    }
  }

  private openPopup(): void {

    const $overlay = this.$overlay.nativeElement;
    const $popup = this.$popup.nativeElement;
    const $title = this.$title.nativeElement;
    const $dataContainer = this.$dataContainer.nativeElement;

    this.renderer.addClass($overlay, 'active');
    this.renderer.addClass($popup, 'active');
    this.renderer.addClass($title, 'active');
    this.renderer.addClass($dataContainer, 'active');

  }

  public closePopup() {

    if (this.clickPopup == false) {

      const $overlay = this.$overlay.nativeElement;
      const $popup = this.$popup.nativeElement;
      const $title = this.$title.nativeElement;
      const $dataContainer = this.$dataContainer.nativeElement;

      this.renderer.removeClass($overlay, 'active')
      this.renderer.removeClass($popup, 'active')
      this.renderer.removeClass($title, 'active');
      this.renderer.removeClass($dataContainer, 'active');

      this.isOpenView = false;
      this.eventClosePopup.emit(this.isOpenView);
    }
    this.clickPopup = false;
  }




}
