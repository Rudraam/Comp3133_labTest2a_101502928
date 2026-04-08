import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { SpacexService } from '../../services/spacex.service';
import { Launch } from '../../models/launch.model';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { LaunchDetailComponent } from '../launch-detail/launch-detail.component';

@Component({
  selector: 'app-launch-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    SearchBarComponent,
    LaunchDetailComponent
  ],
  templateUrl: './launch-list.component.html',
  styleUrl: './launch-list.component.css'
})
export class LaunchListComponent implements OnInit {
  private spacexService = inject(SpacexService);

  launches = signal<Launch[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  searchQuery = signal('');
  selectedLaunch = signal<Launch | null>(null);

  filteredLaunches = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {
      return this.launches();
    }
    return this.launches().filter(launch =>
      launch.name.toLowerCase().includes(query) ||
      launch.flight_number.toString().includes(query) ||
      (launch.details ?? '').toLowerCase().includes(query)
    );
  });

  ngOnInit(): void {
    this.fetchLaunches();
  }

  fetchLaunches(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.spacexService.getLaunches().subscribe({
      next: (data) => {
        this.launches.set(data);
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.isLoading.set(false);
      }
    });
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
  }

  selectLaunch(launch: Launch): void {
    this.selectedLaunch.set(launch);
  }

  closeDetail(): void {
    this.selectedLaunch.set(null);
  }

  getStatusClass(launch: Launch): string {
    if (launch.upcoming) return 'status-upcoming';
    if (launch.success === true) return 'status-success';
    if (launch.success === false) return 'status-failed';
    return 'status-unknown';
  }
}
