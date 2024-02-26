import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-window.component.html',
  styleUrl: './forecast-window.component.css'
})
export class ForecastWindowComponent implements OnInit {

  data: any[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient
    .get('https://localhost:7032/api/Home')
    .subscribe((data: any) => {
      console.log(data);
      this.data = data;
    });
  }

  // Controllers to display data

  location: string = '----';
  time: Date = new Date(0);
  temperature: number = 0;
  windDirection: number = 0;
  humidity: number = 0;
  visibility: number = 0;
  uvIndex: number = 0;
  dewPoint: number = 0;
}
