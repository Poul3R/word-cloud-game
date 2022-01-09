import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WordSetsService} from "../../_services/word-sets.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {
  @Input() word: string;
  @Input() correct: boolean;
  @Output() clicked: EventEmitter<string> = new EventEmitter<string>();
  selected: boolean = false;
  showFlag: Observable<boolean>;

  constructor(private readonly _wordSetsService: WordSetsService) {
  }

  ngOnInit(): void {
    this.showFlag = this._wordSetsService.showWordFlags$;
  }

  clickElement() {
    this.showFlag.subscribe(show => {
      if (!show) {
        this.selected = !this.selected;
        this.clicked.emit(this.word);
      }
    });
  }
}
