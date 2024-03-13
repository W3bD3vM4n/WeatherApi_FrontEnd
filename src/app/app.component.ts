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

  inputValue: string = ''; // entrada de Datos del Usuario
  locationValue: string = '';
  code: string = '';
  extractedCode: weatherCodes | undefined;

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
          windDirection: 0,
          weatherCode: 0
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

  arrayWeatherCode: arrayWeatherCodes = [
    {
      code: "1000",
      image: "src/assets/images/weatherCode/1000.png",
      description: "Clear, Sunny"
    },
    {
      code: "1100",
      image: "src/assets/images/weatherCode/1100.png",
      description: "Mostly Clear"
    },
    {
      code: "1101",
      image: "src/assets/images/weatherCode/1101.png",
      description: "Partly Cloudy"
    },
    {
      code: "1102",
      image: "src/assets/images/weatherCode/1102.png",
      description: "Mostly Cloudy"
    },
    {
      code: "1001",
      image: "src/assets/images/weatherCode/1001.png",
      description: "Cloudy"
    },
    {
      code: "2000",
      image: "src/assets/images/weatherCode/2000.png",
      description: "Fog"
    },
    {
      code: "2100",
      image: "src/assets/images/weatherCode/2100.png",
      description: "Light Fog"
    },
    {
      code: "4000",
      image: "src/assets/images/weatherCode/4000.png",
      description: "Drizzle"
    },
    {
      code: "4001",
      image: "src/assets/images/weatherCode/4001.png",
      description: "Rain"
    },
    {
      code: "4200",
      image: "src/assets/images/weatherCode/4200.png",
      description: "Light Rain"
    },
    {
      code: "4201",
      image: "src/assets/images/weatherCode/4201.png",
      description: "Heavy Rain"
    },
    {
      code: "5000",
      image: "src/assets/images/weatherCode/5000.png",
      description: "Snow"
    },
    {
      code: "5001",
      image: "src/assets/images/weatherCode/5001.png",
      description: "Flurries"
    },
    {
      code: "5100",
      image: "src/assets/images/weatherCode/5100.png",
      description: "Light Snow"
    },
    {
      code: "5101",
      image: "src/assets/images/weatherCode/5101.png",
      description: "Heavy Snow"
    },
    {
      code: "6000",
      image: "src/assets/images/weatherCode/6000.png",
      description: "Freezing Drizzle"
    },
    {
      code: "6001",
      image: "src/assets/images/weatherCode/6001.png",
      description: "Freezing Rain"
    },
    {
      code: "6200",
      image: "src/assets/images/weatherCode/6200.png",
      description: "Light Freezing Rain"
    },
    {
      code: "6201",
      image: "src/assets/images/weatherCode/6201.png",
      description: "Heavy Freezing Rain"
    },
    {
      code: "7000",
      image: "src/assets/images/weatherCode/7000.png",
      description: "Ice Pellets"
    },
    {
      code: "7101",
      image: "src/assets/images/weatherCode/7101.png",
      description: "Heavy Ice Pellets"
    },
    {
      code: "7102",
      image: "src/assets/images/weatherCode/7102.png",
      description: "Light Ice Pellets"
    },
    {
      code: "8000",
      image: "src/assets/images/weatherCode/8000.png",
      description: "Thunderstorm"
    },
  ]

  fetchData() {
    this.locationValue ='https://localhost:7032/api/Home?location=' + this.inputValue;

    this.httpClient
    .get(this.locationValue)
    .subscribe((data: any) => {
      console.log(data);
      this.weatherData = data;

      this.code = this.weatherData.timelines.minutely[0].values.weatherCode.toString();
      console.log(`El código es: ${this.code}`);

      this.extractedCode = this.arrayWeatherCode.find(x => x.code === this.code); 
      console.log(this.extractedCode?.image);
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
          "windDirection": number,
          "weatherCode": number
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

type weatherCodes = {
    code: string,
    image: string,
    description: string
  }

type arrayWeatherCodes = weatherCodes[];