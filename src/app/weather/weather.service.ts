import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Summary } from '@angular/compiler';
import { WeatherData } from '../models/weather';

@Injectable()
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/forecast';
  params = {
    q: '',
    cnt: '24',
    units: 'metric',
    APPID: '614f423ec961e8f3db75b0ed0cd5adbd',
  };

  constructor(private http: HttpClient) {}

  searchWeatherForCity(city: Summary<string>) {
    this.params.q = city as unknown as string;
    return this.http.get<WeatherData>(this.url, {
        params: this.params
      }).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
