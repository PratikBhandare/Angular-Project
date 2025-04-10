import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-button',
  standalone: false,
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.css'
})
export class NavButtonComponent {
  @Input() label:string="";
  @Output() btnclick=new EventEmitter();

  btnClick(e:any){
    this.btnclick.emit(e)
  }

}
