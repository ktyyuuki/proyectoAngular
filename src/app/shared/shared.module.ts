import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HeaderSizeDirective } from './directives/header-size.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    HeaderSizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe,
    HeaderSizeDirective
  ]
})
export class SharedModule { }
