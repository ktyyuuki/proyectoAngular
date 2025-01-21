import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../modules/dashboard/pages/students/models';

@Pipe({
  name: 'fullName',
  standalone: false
})
export class FullNamePipe implements PipeTransform {
  transform(value: Student): string {
    return `${value.name} ${value.lastName}`;
  }
}
