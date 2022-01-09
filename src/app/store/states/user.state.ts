import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Login, Logout} from "../actions/user.actions";

interface IUserState {
  login: string | null;
}

const defaults: IUserState = {
  login: null
}

@State<IUserState>({
  name: 'user',
  defaults
})

@Injectable()
export class UserState {

  @Selector()
  static login(state: IUserState): string | null {
    return state.login;
  }

  constructor() {
  }

  @Action(Login)
  Login(ctx: StateContext<IUserState>, action: Login) {
    ctx.patchState({
      login: action.login
    })
  }

  @Action(Logout)
  Logout(ctx: StateContext<IUserState>, action: Logout) {
    ctx.patchState({
      login: null
    })
  }
}
