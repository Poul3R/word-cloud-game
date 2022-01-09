import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BoardViewComponent} from "./_smart-components/board-view/board-view.component";
import {BoardRoutingModule} from "./board-routing.module";
import {WordSetsService} from "./_services/word-sets.service";
import { ElementComponent } from './_dumb-components/element/element.component';
import { ResultComponent } from './_dumb-components/result/result.component';

@NgModule({
  declarations: [BoardViewComponent, ElementComponent, ResultComponent],
  imports: [CommonModule, BoardRoutingModule],
  providers: [WordSetsService]
})
export class BoardModule {}
