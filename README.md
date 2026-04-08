# Lab Test 2 - COMP 3133

## SpaceX Mission Dashboard

An Angular application that fetches and displays SpaceX launch data using the
SpaceX REST API v3. Built for COMP 3133 Lab Test 2a.

## Features Implemented

- ✅ Angular HttpClientModule for REST API integration
- ✅ MissionList component with mission cards grid
- ✅ MissionDetails component with full mission information
- ✅ Filter by Launch Year (2006–2020)
- ✅ Filter by Successful Launch (true/false)
- ✅ Filter by Successful Landing (true/false)
- ✅ Angular Material UI components (cards, toolbar, chips, buttons, spinner)
- ✅ TypeScript interface for Mission data model
- ✅ SpaceX API Service with multiple endpoints
- ✅ Angular Routing between list and detail views
- ✅ FormsModule and ReactiveFormsModule

## API Reference

- All launches: `https://api.spacexdata.com/v3/launches`
- Filter by year: `https://api.spacexdata.com/v3/launches?launch_year=2020`
- Single launch: `https://api.spacexdata.com/v3/launches/:flight_number`

## Screenshots

### Mission List View
[Screenshot of mission list with filter panel]

### Mission Filter Applied
[Screenshot showing year/success filter active]

### Mission Details View
[Screenshot of mission detail page]

## How to Run

### Prerequisites
- Node.js 18+
- Angular CLI: `npm install -g @angular/cli`

### Steps

```bash
git clone <your-github-repo-url>
cd spacex-mission-dashboard
npm install
ng serve
```

Navigate to `http://localhost:4200`

### Production Build

```bash
ng build --configuration production
```

## Deployment

Live app: [your-vercel-or-render-url]

## Developer

Dhima — Student
