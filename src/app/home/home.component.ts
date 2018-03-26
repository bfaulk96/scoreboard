import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // redScore: string = "0";
  // blueScore: string = "0";
  constructor(private route: ActivatedRoute,
              @Inject('LOCALSTORAGE') private localStorage: any) {
    if (!this.localStorage.getItem('blue')) {
      this.localStorage.setItem('blue', 0);
    }
    if (!this.localStorage.getItem('red')) {
      this.localStorage.setItem('red', 0);
    }
    const params = this.route.snapshot.params;
    let num: number = parseInt(params['num']) || 1;
    const data = route.snapshot.data;
    const action: string = data.action || "";
    switch (action) {
      case "reset":
        this.localStorage.clear();
        this.localStorage.setItem('red', 0);
        this.localStorage.setItem('blue', 0);
        break;
      case "incrementBlue":
        this.localStorage.setItem('blue', parseInt(this.localStorage.getItem('blue')) + num);
        break;
      case "incrementRed":
        this.localStorage.setItem('red', parseInt(this.localStorage.getItem('red')) + num);
        break;
      case "setRed":
        this.localStorage.setItem('red', num);
        break;
      case "setBlue":
        this.localStorage.setItem('blue', num);
        break;
      default:
        break;
    }
    this.route.queryParams.subscribe(params => {
      if (params['red']) {
        this.localStorage.setItem('red', parseInt(params['red']));
      }
      if (params['blue']) {
        this.localStorage.setItem('blue', parseInt(params['blue']));
      }
    });
  }

  ngOnInit() {

  }

  get blueScore() {
    return this.localStorage.getItem('blue') || "0";
  }

  get redScore() {
    return this.localStorage.getItem('red') || "0";

  }

}
