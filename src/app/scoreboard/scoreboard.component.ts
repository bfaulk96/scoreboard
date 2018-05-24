import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ConfigService} from "../config.service";
import {Scoreboard} from "./scoreboard";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  code: string;
  game: Scoreboard;
  loading: boolean = true;
  showTitle: boolean = true;
  showTitlePreview: boolean = false;
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private configService: ConfigService) {
    this.route.params.subscribe(res => this.code = res.code);
  }

  ngOnInit() {
    setTimeout(() => {
      this.getGame();
    }, 500);
    this.refreshGame();
  }

  getGame() {
    this.getGameByCode().subscribe(
      data => {
        this.game = data;
      },
      err => console.error(err),
      () => {
        this.loading = false;
        console.log('done loading game');
      }
    );
  }

  getGameByCode() {
    return this.http.get<Scoreboard>(this.configService.data.apiURL + '/games/code/' + this.code);
  }

  refreshGame() {
    setTimeout(() => {
      this.getGame();
      this.refreshGame();
    }, 5000)
  }

  hideTitle() {
    this.showTitle = false;
    this.showTitlePreview = false;
  }

  showTitleNav() {
    this.showTitle = true;
  }

  showTitleNavPreview() {
    this.showTitlePreview = true;
  }

  hideTitlePreview() {
    this.showTitlePreview = false;
  }
}
