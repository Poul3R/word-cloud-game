import {Component, OnInit} from '@angular/core';
import {WordSetsService} from "../../_services/word-sets.service";
import {BoardModel} from "../../models/board.model";
import {Store} from "@ngxs/store";
import {UserState} from "../../../../store/states/user.state";
import {CountPointsResult, EnableWordsFlag, SelectWord, SetWordsSet} from "../../../../store/actions/game.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss']
})
export class BoardViewComponent implements OnInit {
  wordsSet: BoardModel.IWordsSet | null;
  sets: BoardModel.IWordsSet[];
  enableFinishGame: boolean = false;
  user: string | null;

  private _selectedWords: any = [];

  constructor(
    private readonly _wordSetsService: WordSetsService,
    private readonly _store: Store,
    private readonly _router: Router
  ) {
  }

  ngOnInit(): void {
    this._wordSetsService.getSetsList().subscribe((sets: BoardModel.IWordsSet[]) => {
      this.sets = sets;
    });

    this.user = this._store.selectSnapshot(UserState.login);
  }

  getRandomSet(): void {
    console.log('LOSUJEMY ZESAW')
    this.wordsSet = this.sets[Math.floor(Math.random() * this.sets.length)];
    console.log(this.wordsSet)
    this._store.dispatch(new SetWordsSet(this.wordsSet));
  }

  checkAnswers(): void {
    this._store.dispatch(new EnableWordsFlag(true));

    this.enableFinishGame = true;
  }

  wordIsCorrect(word: string): boolean {
    return this.wordsSet!.good_words.includes(word);
  }

  clickedWord(word: string): void {
    this._store.dispatch(new SelectWord(word));
  }

  finishGame(): void {
    this._store.dispatch(new CountPointsResult());
    this._router.navigate(['/', 'board', 'result']);
  }
}
