import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainer } from './weather.container';
import { WeatherService } from './weather.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import * as WeatherActions from './store/actions/weather';
import { Observable, of } from 'rxjs';

describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;

  let store;
  beforeEach(async(() => {
    store = jasmine.createSpyObj(['dispatch', 'pipe', 'select']);

    TestBed.configureTestingModule({
      declarations: [WeatherContainer],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: WeatherService },
        { provide: Store, useValue: store },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search weather for a given city', () => {
    spyOn(component, 'getWeatherForecast');
    component.citySearch('london');
    expect(store.dispatch).toHaveBeenCalled();
  });
  it('should able to get WeatherData forecast', () => {
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
          name: 'Woking',
          country: 'GB',
          population: 103932,
        },
        cnt: 24,
        cod: '200',
        list: [],
      },
    ];;
    component.weather$ = of(collection);
    component.getWeatherForecast();
    expect(component.weatherList).toBeDefined();
    expect(component.weatherList.length).toEqual(2);
  });
});
