import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UsersService } from '../../../../core/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogFormComponent } from './components/user-dialog-form/user-dialog-form.component';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectUsers } from './store/user.selectors';

@Component({
  selector: 'app-users',
  standalone: false,

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  dataSource : User[] = [];
  isLoading : boolean = false;

  users$: Observable<User[]>;

  constructor(
    private usersService: UsersService,
    private matDialog: MatDialog,
    private store: Store
  ){
    this.users$ = this.store.select(selectUsers);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.usersService.loadUsers();

    this.users$.pipe(
      tap((users) => {
        this.dataSource = [...users];
        console.log(this.dataSource);
        this.isLoading = false;
      })
    ).subscribe();

    // this.usersService.getUsers().subscribe({
    //   next: (data) => {
    //     this.dataSource = [...data];
    //   },
    //   error: () => this.isLoading = false,
    //   complete: () => this.isLoading = false
    // })
  }

  openDialogForm(editUser?: User) : void {
    this.matDialog.open(UserDialogFormComponent, {data: {editUser}})
    .afterClosed().subscribe({
      next: () => {}
    })
  }

  addNewUser() : void {
    this.isLoading = true;

  }

  updateUser(userId: User['id']) : void {}

  deleteUserById(id: User['id']) : void {
    this.usersService.deleteUserById(id);
  }


}
