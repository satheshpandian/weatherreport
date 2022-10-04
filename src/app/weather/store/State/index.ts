import { Summary } from '@angular/compiler';
import { WeatherData } from '../../../models/weather';

export interface State {
  city: Summary<string>;
  weather: WeatherData;
}
