import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SpaceXApiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missiondetails',
  standalone: false,
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailsComponent implements OnInit {
  mission: Mission | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private spacexApi: SpaceXApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const state = window.history.state as { mission?: Mission };
    if (state && state.mission) {
      this.mission = state.mission;
      this.isLoading = false;
    } else {
      const flightNumber = Number(this.route.snapshot.paramMap.get('flight_number'));
      this.spacexApi.getLaunchByFlightNumber(flightNumber).subscribe({
        next: (data) => {
          this.mission = data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
