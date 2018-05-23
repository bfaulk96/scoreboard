import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../config.service";
import {HttpClient} from "@angular/common/http";
import {Scoreboard} from "../scoreboard/scoreboard";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean = true;
  autoUpdate: boolean = true;
  games: Scoreboard[];
  config: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private configService: ConfigService,
              private http: HttpClient) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.getAllGames();
    }, 500);
    this.delayUpdateGames();
  }

  getAllGames() {
    this.getGames().subscribe(
      data => {
        this.games = data.activeGames;
        this.loading = false;
      },
      err => console.error(err),
      () => {
        console.log('done loading games');
        this.loading = false;
      }
    );
  }

  getGames() {
    return this.http.get<{"activeGames" : Scoreboard[]}>(this.configService.data.apiURL + '/games');
  }

  delayUpdateGames() {
    setTimeout(() => {
      if (this.autoUpdate) {
        this.getAllGames();
        this.delayUpdateGames()
      }
    }, 10000);
  }

  autoUpdateChanged() {
    this.autoUpdate = !this.autoUpdate;
    if (this.autoUpdate) {
      this.delayUpdateGames()
    }
  }
}
