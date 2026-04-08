import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'missionStatus',
  standalone: true
})
export class MissionStatusPipe implements PipeTransform {
  transform(success: boolean | null, upcoming: boolean): string {
    if (upcoming) {
      return '🚀 Upcoming';
    }
    if (success === true) {
      return '✅ Success';
    }
    if (success === false) {
      return '❌ Failed';
    }
    return '⏳ Unknown';
  }
}
