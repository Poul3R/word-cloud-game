import {BoardModel} from "../../modules/board/models/board.model";

export class CountPointsResult {
  static readonly type = '[game] getResult';

  constructor() {
  }
}

export class SelectWord {
  static readonly type = '[game] selectWord';

  constructor(public word: string) {
  }
}

export class SetWordsSet {
  static readonly type = '[game] setWordsSet';

  constructor(public set: BoardModel.IWordsSet) {
  }
}

export class ResetGame {
  static readonly type = '[game] resetGame';

  constructor() {
  }
}

export class EnableWordsFlag {
  static readonly type = '[game] enableWordsFlag';

  constructor(public enable: boolean) {
  }
}
