import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {GameState} from "../../../../store/states/game.state";
import {Router} from "@angular/router";
import {ResetGame} from "../../../../store/actions/game.actions";

@Component({
  selector: 'app-result-view-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss']
})
export class ResultViewComponent implements OnInit {
  points: number | null;

  constructor(private readonly _store: Store, private readonly _router: Router) {
  }

  ngOnInit(): void {
    this.points = this._store.selectSnapshot(GameState.pointsResult);

    if (typeof this.points !== "number") {
      this._router.navigate(['/', 'board']);
    }
  }

  newGame() {
    this._store.dispatch(new ResetGame());
    this._router.navigate(['/', 'board']);
  }
}
