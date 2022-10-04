import { createAction, props } from '@ngrx/store';
import { WeatherData } from '../../../models/weather';



export const SearchAction = createAction(
  '[WeatherData] Search WeatherData',
  props<{ city }>()
);

export const SearchComplete = createAction(
  '[WeatherData] Search Completed',
  props<{ weather: WeatherData }>()
);

export const ErrorAction = createAction(
  '[WeatherData] Failed',
  props<{ error }>()
);
