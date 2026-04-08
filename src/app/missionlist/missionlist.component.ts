import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpaceXApiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missionlist',
  standalone: false,
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {
  missions: Mission[] = [];
  isLoading = true;

  selectedYear: string = '';
  launchSuccess: boolean | null = null;
  landSuccess: boolean | null = null;

  years: string[] = [
    '2006','2007','2008','2009','2010',
    '2011','2012','2013','2014','2015',
    '2016','2017','2018','2019','2020'
  ];

  constructor(private spacexApi: SpaceXApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllLaunches();
  }

  loadAllLaunches(): void {
    this.isLoading = true;
    this.spacexApi.getAllLaunches().subscribe({
      next: (data) => {
        this.missions = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  filterMissions(): void {
    this.isLoading = true;
    const params: { launch_year?: string; launch_success?: boolean; land_success?: boolean } = {};
    if (this.selectedYear) params.launch_year = this.selectedYear;
    if (this.launchSuccess !== null) params.launch_success = this.launchSuccess;
    if (this.landSuccess !== null) params.land_success = this.landSuccess;

    this.spacexApi.getLaunchesByFilter(params).subscribe({
      next: (data) => {
        this.missions = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  selectYear(year: string): void {
    this.selectedYear = this.selectedYear === year ? '' : year;
    this.filterMissions();
  }

  setLaunchSuccess(value: boolean | null): void {
    this.launchSuccess = this.launchSuccess === value ? null : value;
    this.filterMissions();
  }

  setLandSuccess(value: boolean | null): void {
    this.landSuccess = this.landSuccess === value ? null : value;
    this.filterMissions();
  }

  resetFilters(): void {
    this.selectedYear = '';
    this.launchSuccess = null;
    this.landSuccess = null;
    this.loadAllLaunches();
  }

  onMissionClick(mission: Mission): void {
    this.router.navigate(['/mission', mission.flight_number], { state: { mission } });
  }
}
