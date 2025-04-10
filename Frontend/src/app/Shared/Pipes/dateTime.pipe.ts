import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateAgo',
    pure: true
})
export class DateAgoPipe implements PipeTransform {

    transform(value: string | Date, args?: any): string|Date {
        if (value) {
          
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                return value; 
            }

            const seconds = Math.floor((+new Date() - +date) / 1000);

            if (seconds < 29) {
                return 'Just now';
            }

            const intervals: { [key: string]: number } = {
                'year': 31536000,
                'month': 2592000,
                'week': 604800,
                'day': 86400,
                'hour': 3600,
                'minute': 60,
                'second': 1
            };

            let counter;
            for (const i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0) {
                    // Explicitly type `i` as a key of `intervals`
                    return counter === 1 ? `${counter} ${i} ago` : `${counter} ${i}s ago`;
                }
            }
        }
        return value;
    }
}
