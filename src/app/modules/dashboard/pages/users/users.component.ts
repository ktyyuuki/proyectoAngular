import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-users',
  standalone: false,

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  dataSource : User[] = [];
  isLoading : boolean = false;

  constructor(
    private usersService: UsersService
  ){}

  ngOnInit(): void {
    this.isLoading = true;
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.dataSource = [...data];
      },
      error: () => this.isLoading = false,
      complete: () => this.isLoading = false
    })
  }



}
