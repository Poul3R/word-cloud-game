import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {WordSetsService} from "../../_services/word-sets.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngxs/store";
import {GameState} from "../../../../store/states/game.state";

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit, OnDestroy {
  @Input() word: string;
  @Input() correct: boolean;
  @Output() clicked: EventEmitter<string> = new EventEmitter<string>();
  selected: boolean = false;
  showFlag: boolean;
  subscription$: Subscription = new Subscription();

  constructor(private readonly _wordSetsService: WordSetsService, private readonly _store: Store) {
  }

  ngOnInit(): void {

    this.subscription$.add(
      this._store.select(GameState.showWordFlags).subscribe(enable => {
        this.showFlag = enable;
      })
    );
  }

  ngOnDestroy(): void {
  }

  clickElement() {
      if (!this.showFlag) {
        this.selected = !this.selected;
        this.clicked.emit(this.word);
      }
  }
}
