# 🚀 SpaceX Mission Dashboard

## App Description
SpaceX Mission Dashboard is an Angular application that provides a comprehensive view of SpaceX's launch history and upcoming missions. It connects to the official SpaceX REST API v4 (https://api.spacexdata.com/v4) to retrieve real-time launch data, displaying mission details including status, flight numbers, mission patches, and webcast links in a space-themed dark UI.

## Features Implemented
- Angular HttpClient integration with SpaceX REST API v4
- Reactive search/filter using ReactiveFormsModule and Signals
- Custom pipe: MissionStatusPipe (`missionStatus`) — transforms success/upcoming flags to emoji status strings
- Angular Signals: `signal()`, `computed()` used in LaunchListComponent and LaunchDetailComponent
- `@for`, `@if`, `@switch` control flow directives (all used in templates)
- Angular Material dark-themed UI (mat-toolbar, mat-spinner, mat-button, mat-form-field, mat-icon)
- Routing with lazy-loaded components (`/launches` and `/launches/:id`)
- TypeScript interfaces: `Launch` and `Rocket` (strictly typed, no `any`)
- Responsive glassmorphism card layout with hover glow effects
- Side panel quick-view with signal-based selected launch state
- `debounceTime(300)` + `distinctUntilChanged()` on search input
- Error handling with retry button and loading spinner

## Screenshots
[Add screenshots here with descriptions — e.g., "Launch list view", "Search filtering", "Detail panel"]

## Instructions to Run

### Prerequisites
- Node.js 18+
- Angular CLI: `npm install -g @angular/cli`

### Steps
```bash
git clone <your-repo-url>
cd spacex-mission-dashboard
npm install
ng serve
```
Open browser at `http://localhost:4200`

### Build for Production
```bash
ng build --configuration production
```
