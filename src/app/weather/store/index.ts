import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import * as fromWeather from './reducers/weather';

export interface State {
  weather: fromWeather.State;
}
export const reducers: ActionReducerMap<State> = {
  weather: fromWeather.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];

/**
 * WeatherData Selectors
 */
export const selectWeatherState = (state: State) => state;
export const selectAllWeathers = createSelector(
  selectWeatherState,
  (state: State) =>
    state.weather.collection.length ? state.weather.collection : null
);
