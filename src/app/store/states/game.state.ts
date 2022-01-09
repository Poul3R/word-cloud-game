import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Login, Logout} from "../actions/user.actions";
import {CountPointsResult, EnableWordsFlag, ResetGame, SelectWord, SetWordsSet} from "../actions/game.actions";
import {BoardModel} from "../../modules/board/models/board.model";

interface IGameState {
  result: number | null;
  selectedWords: string[];
  wordsSet: BoardModel.IWordsSet | null,
  showWordFlags: boolean
}

const defaults: IGameState = {
  result: null,
  selectedWords: [],
  wordsSet: null,
  showWordFlags: false
}

@State<IGameState>({
  name: 'game',
  defaults
})

@Injectable()
export class GameState {

  @Selector()
  static pointsResult(state: IGameState): number | null {
    return state.result;
  }

  @Selector()
  static showWordFlags(state: IGameState): boolean {
    return state.showWordFlags;
  }

  @Selector()
  static selectedWords(state: IGameState): string[] {
    return state.selectedWords;
  }

  constructor() {
  }

  @Action(CountPointsResult)
  CountPointsResult(ctx: StateContext<IGameState>, action: CountPointsResult) {
    let selectedCorrectAnswers = 0;
    let leftCorrectAnswers = 0;

    ctx.getState().wordsSet!.good_words.forEach(word => {
      if (ctx.getState().selectedWords.includes(word)) {
        selectedCorrectAnswers++;
      } else {
        leftCorrectAnswers++;
      }
    });

    const selectedWrongAnswers = ctx.getState().selectedWords.length - selectedCorrectAnswers;

    const result = (selectedCorrectAnswers * 2) - (leftCorrectAnswers + selectedWrongAnswers);

    ctx.patchState({
      result: result > 0 ? result : 0
    });

    console.log(ctx.getState());

  }

  @Action(SelectWord)
  SelectWord(ctx: StateContext<IGameState>, action: SelectWord) {
    if (ctx.getState().selectedWords.includes(action.word)) {
      const index = ctx.getState().selectedWords.indexOf(action.word);

      ctx.patchState({
        selectedWords: ctx.getState().selectedWords.splice(index, 1)
      });

    } else {
      ctx.patchState({
        selectedWords: [...ctx.getState().selectedWords, action.word]
      });
    }
  }

  @Action(ResetGame)
  ResetGame(ctx: StateContext<IGameState>, action: ResetGame) {
    ctx.patchState({
      result: null,
      selectedWords: [],
      wordsSet: null,
      showWordFlags: false
    })
  }

  @Action(SetWordsSet)
  SetWordsSet(ctx: StateContext<IGameState>, action: SetWordsSet) {

    ctx.patchState({
      wordsSet: action.set
    })
  }

  @Action(EnableWordsFlag)
  EnableWordsFlag(ctx: StateContext<IGameState>, action: EnableWordsFlag) {

    ctx.patchState({
      showWordFlags: action.enable
    })
  }
}
