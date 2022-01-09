import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BoardViewComponent} from "./_smart-components/board-view/board-view.component";
import {ResultViewComponent} from "./_smart-components/result/result-view.component";

const routes: Routes = [
  {
    path: '',
    component: BoardViewComponent
  },
  {
    path: 'result',
    component: ResultViewComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [RouterModule]
})
export class BoardRoutingModule {
}
