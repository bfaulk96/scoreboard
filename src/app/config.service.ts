import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ConfigService {
  data: any;
  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get<Config>("./assets/data.json")
  }
}

export class Config {
  apiURL: string;
}
