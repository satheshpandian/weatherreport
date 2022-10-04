import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { WeatherService } from '../../weather.service';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  cityForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.cityForm = this.formBuilder.group({
      cityName: [null, Validators.required]
    });
  }

  get cityName() {
    return this.cityForm.get('cityName') as FormControl;
  }
  searchEvent(value: string) {
    if (value) {
    this.search.emit(value);
    }
  }
}
