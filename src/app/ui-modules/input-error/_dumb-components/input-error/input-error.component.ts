import {Component, Input} from '@angular/core';
import {FormControl, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent {
  @Input() _control: FormControl;

  constructor() {
  }

  get errors(): ValidationErrors | null {
    return this._control.touched && !this._control.disabled
      ? this._control?.errors ?? null
      : null;
  }

  get errorText(): string | null {
    if (this.errors) {

      let variable: number | string = '';

      switch (Object.keys(this.errors)[0]) {
        case 'minlength':
          variable = this.errors.minlength.requiredLength;
          break;
        case 'maxlength':
          variable = this.errors.maxlength.requiredLength;
          break;
      }

      const ERROR_MESSAGES: { key: string, message: string }[] = [
        {
          key: 'required',
          message: 'Field is required'
        },
        {
          key: 'minlength',
          message: `Min. chars amount - ${variable}`
        },
        {
          key: 'maxlength',
          message: `Maks. chars amount - ${variable}`
        }
      ];

      const {errors: errors1} = this;
      return ERROR_MESSAGES.find(c => c.key === Object.keys(errors1)[0])!.message;
    } else {
      return null;
    }
  }
}
