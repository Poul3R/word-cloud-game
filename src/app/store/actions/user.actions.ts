export class Login {
  static readonly type = '[user] login';

  constructor(public login: string) {
  }
}

export class Logout {
  static readonly type = '[user] logout';

  constructor() {
  }
}
