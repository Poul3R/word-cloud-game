import {NgModule} from "@angular/core";
import {LoginViewComponent} from "./_smart-components/login-view/login-view.component";
import {CommonModule} from "@angular/common";
import {LoginRoutingModule} from "./login-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {InputErrorModule} from "../../ui-modules/input-error/input-error.module";

@NgModule({
  declarations: [LoginViewComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    InputErrorModule
  ],
  providers: []
})
export class LoginModule {}
