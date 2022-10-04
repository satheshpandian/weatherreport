// TO BE IMPLEMENTED IF YOU DECIDE TO USE NG-RX

import { TestBed } from '@angular/core/testing';
import { WeatherService } from '../../weather.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Action, Store } from '@ngrx/store';
import * as WeatherActions from '../actions/weather';
import { Observable, of, throwError } from 'rxjs';
import { WeatherEffects } from './weather';
import { hot } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';

describe('WeatheEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: WeatherEffects;
  const weatherservice = jasmine.createSpyObj('WeatherService', [
    'searchWeatherForCity',
  ]);
  const collection = [
    {
      city: {
        id: 2633709,
        name: 'Woking',
        country: 'GB',
        population: 103932,
      },
      cnt: 24,
      cod: '200',
      list: [],
    },
    {
      city: {
        id: 2633709,
        name: 'London',
        country: 'GB',
        population: 103932,
      },
      cnt: 24,
      cod: '200',
      list: [],
    },
  ];

  function setup(mock: any) {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockActions(() => actions$),
        WeatherEffects,
        { provide: WeatherService, useValue: weatherservice },
      ],
    });
    effects = TestBed.get(WeatherEffects);
  }
  describe('WeatherEffects', () => {
    it('should fetch weather data', () => {
      weatherservice.searchWeatherForCity.and.returnValue(of(collection[0]));

      setup(collection);
      actions$ = hot('-a-|', {
        a: WeatherActions.SearchAction({ city: 'London' }),
      });
      const expected = hot('-a-|', {
        a: WeatherActions.SearchComplete({ weather: collection[0] }),
      });
      expect(effects.searchWeather$).toBeObservable(expected);
    });
    it('fail to fetch weather data', () => {
      actions$ = hot('-a-|', {
        a: WeatherActions.SearchAction({ city: null }),
      });
      setup({ data: null });
      const err = new TypeError('Fail');
      weatherservice.searchWeatherForCity.and.returnValue(throwError(err));
      const expected = hot('-a-|', {
        a: WeatherActions.ErrorAction({ error: err }),
      });
      expect(effects.searchWeather$).toBeObservable(expected);
    });
  });
});
