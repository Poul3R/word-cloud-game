import {Injectable} from "@angular/core";
import {CanLoad, Route, Router, UrlSegment, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from "@ngxs/store";
import {UserState} from "../store/states/user.state";

@Injectable()
export class LoginGuard implements CanLoad {
  constructor(private readonly _store: Store, private readonly _router: Router) {
  }


  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._store.selectSnapshot(UserState.login)) {
      return true;
    }

    return this._router.createUrlTree(['/', 'login']);

  }

}
