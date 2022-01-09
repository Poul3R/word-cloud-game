import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {Login} from "../../../../store/actions/user.actions";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private readonly _router: Router, private readonly _store: Store) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(12)])
    })
  }

  login(): void {
    if (this.loginForm.valid) {
      this._store.dispatch(new Login(this.loginForm.controls.login.value));
      this._router.navigate(['/', 'board']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  getFormControl(path: string): FormControl {
    return this.loginForm.get(path) as FormControl;
  }
}
