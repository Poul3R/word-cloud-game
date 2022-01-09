import {Component, OnInit} from '@angular/core';
import {WordSetsService} from "../../_services/word-sets.service";
import {BoardModel} from "../../models/board.model";
import {Store} from "@ngxs/store";
import {UserState} from "../../../../store/states/user.state";

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss']
})
export class BoardViewComponent implements OnInit {
  wordsSet: BoardModel.IWordsSet | null;
  sets: BoardModel.IWordsSet[];
  enableFinishGame: boolean = false;
  gameFinished: boolean = false;
  user: string | null;
  result = 0;

  private _selectedWords: string[] = [];



  constructor(
    private readonly _wordSetsService: WordSetsService,
    private readonly _store: Store
  ) {
  }

  ngOnInit(): void {
    this._wordSetsService.getSetsList().subscribe((sets: BoardModel.IWordsSet[]) => {
      this.sets = sets;
    });

    this.user = this._store.selectSnapshot(UserState.login);
  }

  getRandomSet(): void {
    this.wordsSet = this.sets[Math.floor(Math.random() * this.sets.length)];
  }

  checkAnswers(): void {
    this._wordSetsService.showWordFlags$.next(true);
    this.enableFinishGame = true;
  }

  isCorrect(word: string): boolean {
    return this.wordsSet!.good_words.includes(word);
  }

  clickedWord(word: string): void {
    if (this._selectedWords.includes(word)) {
      const index = this._selectedWords.indexOf(word);
      this._selectedWords.splice(index, 1);
    } else {
      this._selectedWords.push(word);
    }
  }

  finishGame(): void {
    this.result = this.countPoints();
    this.gameFinished = true;
  }

  countPoints(): number {
    let selectedCorrectAnswers = 0;
    let leftCorrectAnswers = 0;

    this.wordsSet!.good_words.forEach(word => {
      if (this._selectedWords.includes(word)) {
        selectedCorrectAnswers++;
      } else {
        leftCorrectAnswers++;
      }
    });

    const selectedWrongAnswers = this._selectedWords.length - selectedCorrectAnswers;

    const result = (selectedCorrectAnswers * 2) - (leftCorrectAnswers + selectedWrongAnswers);

    return result > 0 ? result : 0;
  }

  resetGame(): void {
    this.wordsSet = null;
    this.enableFinishGame = false;
    this.gameFinished = false;
    this.result = 0;
    this._selectedWords = [];
    this._wordSetsService.showWordFlags$.next(false);
  }
}
