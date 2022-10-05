import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { State } from './store';
import { WeatherService } from './weather.service';
import * as WeatherActions from './store/actions/weather';
import { take, tap, throwIfEmpty } from 'rxjs/operators';
import { selectAllWeathers } from './store';
import { Subscription, throwError } from 'rxjs';
import { WeatherData } from '../models/weather';

@Component({
  selector: 'app-weather',
  template: `
    <app-search (search)="citySearch($event)"></app-search>
    <app-results [weatherList]="weatherList"></app-results>
  `,
})
export class WeatherContainer  {
  public sub: Subscription;
  weather$: Observable<WeatherData[]>;
  weatherList: WeatherData[];

  constructor(public service: WeatherService, private store: Store<State>) {
    this.weatherList = [];
    this.weather$ = store.select(selectAllWeathers);
    this.weather$.subscribe((res) => (this.weatherList = res),
      () => () => throwError);
  }
  citySearch(cityName: string) {
    this.store.dispatch(WeatherActions.SearchAction({ city: cityName }));
  }
}
