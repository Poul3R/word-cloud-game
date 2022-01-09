import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserState} from "./store/states/user.state";
import {NgxsModule} from "@ngxs/store";
import {LoginGuard} from "./guards/login.guard";
import {GameState} from "./store/states/game.state";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgxsModule.forRoot([
      UserState,
      GameState
    ])
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
