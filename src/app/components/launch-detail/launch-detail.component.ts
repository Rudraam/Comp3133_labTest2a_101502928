import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Launch } from '../../models/launch.model';
import { MissionStatusPipe } from '../../pipes/mission-status.pipe';
import { SpacexService } from '../../services/spacex.service';

@Component({
  selector: 'app-launch-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MissionStatusPipe
  ],
  templateUrl: './launch-detail.component.html',
  styleUrl: './launch-detail.component.css'
})
export class LaunchDetailComponent implements OnInit {
  @Input() launch: Launch | null = null;
  @Output() close = new EventEmitter<void>();

  private route = inject(ActivatedRoute);
  private spacexService = inject(SpacexService);

  isLoading = signal(false);
  error = signal<string | null>(null);
  routeLaunch = signal<Launch | null>(null);

  get displayLaunch(): Launch | null {
    return this.launch ?? this.routeLaunch();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !this.launch) {
      this.isLoading.set(true);
      this.spacexService.getLaunchById(id).subscribe({
        next: (data) => {
          this.routeLaunch.set(data);
          this.isLoading.set(false);
        },
        error: (err: Error) => {
          this.error.set(err.message);
          this.isLoading.set(false);
        }
      });
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
