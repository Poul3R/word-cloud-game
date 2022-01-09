import {NgModule} from '@angular/core';
import {InputErrorComponent} from './_dumb-components/input-error/input-error.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    InputErrorComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    InputErrorComponent
  ]
})
export class InputErrorModule {}
