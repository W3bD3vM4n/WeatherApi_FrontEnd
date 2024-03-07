import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // @Input() item = ''; // datos que llegan al componente Hijo

  inputValue: string = ''; // entrada de Datos del Usuario
  locationValue: string = '';

  constructor(private httpClient: HttpClient) {}

  //Inicializando objeto weatherDataModel
  weatherData: WeatherDataModel = {
    timelines: {
      minutely: [
      {
        time: '',
        values: {
          dewPoint: 0,
          humidity: 0,
          temperature: 0,
          uvIndex: 0,
          visibility: 0,
          windDirection: 0
        }
      }
    ]
  },
    location: {
      latitude: 0,
      longitude: 0,
      name: ''
    }
  }

  fetchData() {
    this.locationValue ='https://localhost:7032/api/Home?location=' + this.inputValue;

    this.httpClient
    .get(this.locationValue)
    .subscribe((data: any) => {
      console.log(data);
      this.weatherData = data;
    });
  } 

  handleClick() {
    this.fetchData();
  }
}

//Objeto weatherDataModel usando para guardar el resultado de la api en un objeto fuertemente tipado
type WeatherDataModel = {
  timelines: {
    minutely: [
    {
        "time": string,
        "values": {
          "dewPoint": number,
          "humidity": number,
          "temperature": number,
          "uvIndex": number,
          "visibility": number,
          "windDirection": number
        }
      }
    ]
  }

  location: {
    latitude: number,
    longitude: number,
    name: string
  }
}