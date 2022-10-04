import { createReducer, on, Action, createSelector } from '@ngrx/store';
import * as WeatherActions from '../actions/weather';
import { Summary } from '@angular/compiler';
import { WeatherData } from '../../../models/weather';

export interface State {
  city: Summary<string> | null;
  collection: WeatherData[];
}

export const initialState: State = {
  city: null,
  collection: [],
};
const createWeatherList = (weathers: WeatherData[], weather: WeatherData) => [
  ...weathers,
  weather,
];

export const reducers = createReducer(
  initialState,
  on(WeatherActions.SearchAction, (state, action) => {
    return {
      ...state,
      collection: state.collection,
      city: action.city,
    };
  }),
  on(WeatherActions.SearchComplete, (state, action) => {
    const newCity = action.weather;
    const existing = state.collection.filter(w => w.city.id === newCity.city.id);
    return {
        ...state,
        collection: createWeatherList(state.collection, action.weather),
      };

  })
);
export function reducer(state: State | undefined, action: Action) {
  return reducers(state, action);
}
