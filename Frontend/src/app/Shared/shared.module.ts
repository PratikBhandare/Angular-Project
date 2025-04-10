import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogModule } from '../Features/blog/blog.module';
import { GButtonComponent } from './Components/g-button/g-button.component';
import { NavButtonComponent } from './Components/nav-button/nav-button.component';
import { GFormComponent } from './Components/g-form/g-form.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    GButtonComponent,
    NavButtonComponent,
    GFormComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    NavButtonComponent,
    GFormComponent
  ]
})
export class SharedModule { }
