import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, act } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, concatMap, catchError } from 'rxjs/operators';
import { WeatherService } from '../../weather.service';
import * as fromWeather from '../actions/weather';

@Injectable()
export class WeatherEffects {
  constructor(
    private weatherService: WeatherService,
    private actions$: Actions
  ) {}
  searchWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromWeather.SearchAction),
      concatMap((action) => {
        return this.weatherService.searchWeatherForCity(action.city).pipe(
          map((weather) => fromWeather.SearchComplete({ weather })),
          catchError((error) =>
            of(fromWeather.ErrorAction({ error }))
          )
        );
      })
    );
  });
}
