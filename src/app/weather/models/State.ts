import { Summary } from '@angular/compiler';
import { WeatherData } from './weatherData';

export interface State {
  city: Summary<string>;
  weather: WeatherData;
}
