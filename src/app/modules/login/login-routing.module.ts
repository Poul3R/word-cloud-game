import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginViewComponent} from "./_smart-components/login-view/login-view.component";

const routes: Routes = [
  {
    path: '',
    component: LoginViewComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
