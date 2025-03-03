import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-users-table',
  standalone: false,

  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  displayedColumns: string[] = ["id", "name", "email", "profile", "edit", "delete"]
  @Input()
  dataSource : User[] = [];

  @Output()
  delete = new EventEmitter<User['id']>();

  @Output()
  edit = new EventEmitter<User>();

}
